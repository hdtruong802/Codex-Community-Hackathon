import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { docsRoot, ocrImagesDir, processedDir } from '../../rag/config.js';
import { chunkText, contentHash, normalizeText, stablePointId } from '../../rag/chunking.js';
import { embedText } from '../../rag/embeddings.js';
import { ocrImage } from '../../rag/ocr.js';
import { ensureCollection, upsertPoints } from '../../rag/qdrant.js';

const dryRun = process.argv.includes('--dry-run');
const enableOcr = process.argv.includes('--ocr')
  || process.env.RAG_ENABLE_OCR === 'true'
  || process.env.RAG_ENABLE_OPENAI_OCR === 'true';
const venvPython = path.join(docsRoot, '..', '.venv', 'Scripts', 'python.exe');
const pythonExecutable = process.env.PYTHON_BIN || (existsSync(venvPython) ? venvPython : 'python');

const sources = [
  {
    characterId: 'tran_hung_dao',
    folder: 'TranHungDao',
    match: 'fact-',
    docType: 'fact',
    tags: ['tran-hung-dao', 'nguyen-mong', 'bach-dang', 'khang-chien'],
    titleFromFile: true
  },
  {
    characterId: 'tran_hung_dao',
    folder: 'TranHungDao',
    match: 'giongvan-',
    docType: 'style',
    tags: ['tran-hung-dao', 'hich-tuong-si', 'giong-van'],
    titleFromFile: true
  },
  {
    characterId: 'ly_thuong_kiet',
    folder: 'LyThuongKiet',
    match: 'fact-',
    docType: 'fact',
    tags: ['ly-thuong-kiet', 'tong', 'song-nhu-nguyet', 'ung-chau'],
    titleFromFile: true
  },
  {
    characterId: 'ly_thuong_kiet',
    folder: 'LyThuongKiet',
    match: 'giongvan-',
    docType: 'style',
    tags: ['ly-thuong-kiet', 'nam-quoc-son-ha', 'phat-tong', 'giong-van'],
    titleFromFile: true
  },
  {
    characterId: 'ho_xuan_huong',
    folder: 'HoXuanHuong',
    match: 'sangtac-doisong-',
    docType: 'fact',
    tags: ['ho-xuan-huong', 'tho-nom', 'doi-song', 'sang-tac', 'van-hoc'],
    titleFromFile: true
  }
];

const toTitle = (fileName) => path.basename(fileName, path.extname(fileName))
  .replace(/^[^-]+-(fact|giongvan|sangtac-doisong)-/i, '')
  .replace(/[-_]+/g, ' ')
  .trim();

const citationLabel = ({ sourceTitle, pageStart, pageEnd }) => {
  const pages = pageStart ? `, tr. ${pageStart}${pageEnd && pageEnd !== pageStart ? `-${pageEnd}` : ''}` : '';
  return `${sourceTitle}${pages}`;
};

const sanitizeErrorMessage = (message) => String(message || 'unknown error')
  .replace(/sk-[A-Za-z0-9_-]+/g, '[REDACTED_API_KEY]')
  .replace(/key provided: [A-Za-z0-9_*.-]+/gi, 'key provided: [REDACTED_API_KEY]');

const appendJsonl = async (filePath, records) => {
  const content = records.map((record) => JSON.stringify(record)).join('\n');
  await fs.writeFile(filePath, content ? `${content}\n` : '', 'utf8');
};

const listSourceFiles = async () => {
  const matchedFiles = [];

  for (const source of sources) {
    const folderPath = path.join(docsRoot, source.folder);
    const files = await fs.readdir(folderPath);

    for (const fileName of files) {
      if (!fileName.includes(source.match)) continue;
      matchedFiles.push({
        ...source,
        fileName,
        filePath: path.join(folderPath, fileName),
        sourceFile: path.join('docs', source.folder, fileName).replace(/\\/g, '/'),
        sourceTitle: toTitle(fileName)
      });
    }
  }

  return matchedFiles;
};

const extractPdfPages = async (file) => {
  const renderDir = path.join(ocrImagesDir, contentHash(file.sourceFile));
  const result = spawnSync(pythonExecutable, [
    path.join('scripts', 'rag', 'extract_pdf_pages.py'),
    '--pdf',
    file.filePath,
    '--render-dir',
    renderDir,
    ...(enableOcr ? ['--render-ocr'] : [])
  ], {
    cwd: path.join(docsRoot, '..', 'server'),
    encoding: 'utf8',
    env: {
      ...process.env,
      PYTHONIOENCODING: 'utf-8'
    }
  });

  if (result.error || result.status !== 0) {
    return [{
      ...file,
      page: 1,
      text: '',
      textLength: 0,
      wordCount: 0,
      imageCount: 0,
      status: 'manual_review',
      extractionMethod: 'manual',
      quality: 'manual_review',
      warnings: [`PDF extraction failed: ${result.error?.message || result.stderr || 'unknown error'}`]
    }];
  }

  const parsed = JSON.parse(result.stdout || '{}');

  if (!parsed.ok) {
    return [{
      ...file,
      page: 1,
      text: '',
      textLength: 0,
      wordCount: 0,
      imageCount: 0,
      status: 'manual_review',
      extractionMethod: 'manual',
      quality: 'manual_review',
      warnings: [parsed.error || 'PyMuPDF extraction unavailable']
    }];
  }

  const pages = [];

  for (const page of parsed.pages) {
    if (page.status === 'needs_ocr' && enableOcr && page.imagePath) {
      try {
        const ocr = await ocrImage(page.imagePath);
        const text = normalizeText(ocr.text || '');
        const confidence = Number(ocr.confidence || 0);
        pages.push({
          ...file,
          ...page,
          text,
          status: confidence >= 0.75 && text.length >= 80 ? 'text_ok' : 'manual_review',
          extractionMethod: process.env.RAG_OCR_PROVIDER === 'openai' ? 'openai_ocr' : 'tesseract_ocr',
          quality: confidence >= 0.75 && text.length >= 80 ? 'clean' : 'manual_review',
          ocrConfidence: confidence,
          warnings: ocr.warnings || []
        });
      } catch (error) {
        pages.push({
          ...file,
          ...page,
          text: '',
          status: 'manual_review',
          extractionMethod: process.env.RAG_OCR_PROVIDER === 'openai' ? 'openai_ocr' : 'tesseract_ocr',
          quality: 'manual_review',
          warnings: [`OCR failed: ${sanitizeErrorMessage(error.message)}`]
        });
      }
    } else {
      pages.push({
        ...file,
        ...page,
        text: normalizeText(page.text),
        extractionMethod: page.status === 'text_ok' ? 'local_text' : 'manual',
        quality: page.status === 'text_ok' ? 'clean' : 'manual_review',
        warnings: page.status === 'needs_ocr' ? ['Page needs OCR; rerun with --ocr after installing Tesseract or configure RAG_OCR_PROVIDER=openai with a valid API key.'] : []
      });
    }
  }

  return pages;
};

const extractTxtPage = async (file) => {
  const text = normalizeText(await fs.readFile(file.filePath, 'utf8'));
  return [{
    ...file,
    page: 1,
    text,
    textLength: text.length,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    imageCount: 0,
    status: 'text_ok',
    extractionMethod: 'local_text',
    quality: 'clean',
    warnings: []
  }];
};

const buildChunks = (pages) => {
  const chunks = [];

  for (const page of pages) {
    if (page.quality !== 'clean') continue;

    const pageChunks = chunkText({ text: page.text, docType: page.docType });
    pageChunks.forEach((content, index) => {
      const hash = contentHash(content);
      chunks.push({
        id: stablePointId(page.sourceFile, page.page, page.page, index, hash),
        characterId: page.characterId,
        docType: page.docType,
        sourceTitle: page.sourceTitle,
        sourceFile: page.sourceFile,
        pageStart: page.page,
        pageEnd: page.page,
        chunkIndex: index,
        content,
        tags: page.tags,
        citationLabel: citationLabel({
          sourceTitle: page.sourceTitle,
          pageStart: page.page,
          pageEnd: page.page
        }),
        extractionMethod: page.extractionMethod,
        quality: page.quality,
        contentHash: hash,
        indexedAt: new Date().toISOString()
      });
    });
  }

  return chunks;
};

const main = async () => {
  await fs.mkdir(processedDir, { recursive: true });
  await fs.mkdir(ocrImagesDir, { recursive: true });

  const files = await listSourceFiles();
  const pages = [];

  for (const file of files) {
    if (file.fileName.toLowerCase().endsWith('.pdf')) {
      pages.push(...await extractPdfPages(file));
    } else if (file.fileName.toLowerCase().endsWith('.txt')) {
      pages.push(...await extractTxtPage(file));
    }
  }

  const chunks = buildChunks(pages);
  await appendJsonl(path.join(processedDir, 'pages.jsonl'), pages);
  await appendJsonl(path.join(processedDir, 'chunks.jsonl'), chunks);

  const report = {
    files: files.length,
    pages: pages.length,
    chunks: chunks.length,
    needsOcr: pages.filter((page) => page.status === 'needs_ocr').length,
    manualReview: pages.filter((page) => page.quality === 'manual_review').length,
    dryRun
  };

  if (!dryRun && chunks.length) {
    await ensureCollection();
    const points = [];

    for (const chunk of chunks) {
      const vector = await embedText(chunk.content);
      points.push({
        id: chunk.id,
        vector,
        payload: chunk
      });
    }

    await upsertPoints(points);
    report.upserted = points.length;
  }

  console.log(JSON.stringify(report, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
