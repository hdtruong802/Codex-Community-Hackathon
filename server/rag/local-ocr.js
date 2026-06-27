import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import { normalizeText } from './chunking.js';
import { repoRoot } from './config.js';

export const ocrImageWithTesseract = async (imagePath) => {
  const defaultWindowsBinary = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe';
  const executable = process.env.TESSERACT_BIN
    || (existsSync(defaultWindowsBinary) ? defaultWindowsBinary : 'tesseract');
  const language = process.env.TESSERACT_LANG || 'vie+eng';
  const localTessdata = path.join(repoRoot, 'tools', 'tessdata');
  const tessdataPrefix = process.env.TESSDATA_PREFIX || (existsSync(localTessdata) ? localTessdata : undefined);
  const result = spawnSync(executable, [
    imagePath,
    'stdout',
    '-l',
    language,
    '--psm',
    process.env.TESSERACT_PSM || '6'
  ], {
    encoding: 'utf8',
    env: {
      ...process.env,
      ...(tessdataPrefix ? { TESSDATA_PREFIX: tessdataPrefix } : {}),
      PYTHONIOENCODING: 'utf-8'
    }
  });

  if (result.error || result.status !== 0) {
    throw new Error(result.error?.message || result.stderr || 'Tesseract OCR failed');
  }

  const text = normalizeText(result.stdout);
  return {
    text,
    confidence: text.length >= 80 ? 0.8 : 0.4,
    warnings: []
  };
};
