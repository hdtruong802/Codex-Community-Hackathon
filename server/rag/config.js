import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const repoRoot = path.resolve(__dirname, '../..');
export const docsRoot = path.join(repoRoot, 'docs');
export const processedDir = path.join(__dirname, 'processed');
export const ocrImagesDir = path.join(processedDir, 'ocr-images');

export const ragConfig = {
  provider: process.env.RAG_PROVIDER || 'qdrant',
  collection: process.env.QDRANT_COLLECTION || 'suvietai_history_chunks',
  qdrantUrl: (process.env.QDRANT_URL || 'http://localhost:6333').replace(/\/$/, ''),
  qdrantApiKey: process.env.QDRANT_API_KEY || '',
  embeddingProvider: process.env.RAG_EMBEDDING_PROVIDER || 'local-hash',
  ocrProvider: process.env.RAG_OCR_PROVIDER || 'tesseract',
  embeddingModel: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',
  ocrModel: process.env.OPENAI_OCR_MODEL || 'gpt-4o-mini',
  topK: Number(process.env.RAG_TOP_K || 12),
  contextLimit: Number(process.env.RAG_CONTEXT_LIMIT || 4),
  vectorSize: 1536
};

export const isRagEnabled = () => (
  ragConfig.provider === 'qdrant'
);
