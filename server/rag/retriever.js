import { ragConfig, isRagEnabled } from './config.js';
import { embedText } from './embeddings.js';
import { searchPoints } from './qdrant.js';
import { keywordScore } from './chunking.js';

const STYLE_KEYWORDS = [
  'giọng văn',
  'văn phong',
  'bài thơ',
  'bài hịch',
  'hịch',
  'nam quốc sơn hà',
  'phạt tống',
  'thơ nôm',
  'bánh trôi',
  'tự tình',
  'hồ xuân hương',
  'trào phúng',
  'ẩn dụ',
  'trích',
  'câu chữ'
];

const detectDocType = (question) => {
  const normalized = String(question || '').toLowerCase();
  return STYLE_KEYWORDS.some((keyword) => normalized.includes(keyword)) ? null : 'fact';
};

const formatSource = (payload) => (
  payload.citationLabel
  || `${payload.sourceTitle || payload.sourceFile || 'Tư liệu'}${payload.pageStart ? `, tr. ${payload.pageStart}` : ''}`
);

export const retrieveRagContext = async ({ characterId, question }) => {
  if (!isRagEnabled()) return [];

  try {
    const vector = await embedText(question);
    const docType = detectDocType(question);
    const results = await searchPoints({
      vector,
      characterId,
      docType,
      limit: ragConfig.topK
    });

    return results
      .map((result) => {
        const payload = result.payload || {};
        const vectorScore = Number(result.score || 0);
        const combinedScore = (vectorScore * 0.75) + (keywordScore(question, payload) * 0.25);

        return {
          content: payload.content,
          source: formatSource(payload),
          citationLabel: payload.citationLabel,
          sourceFile: payload.sourceFile,
          pageStart: payload.pageStart,
          pageEnd: payload.pageEnd,
          docType: payload.docType,
          score: combinedScore
        };
      })
      .filter((item) => item.content)
      .sort((a, b) => b.score - a.score)
      .slice(0, ragConfig.contextLimit);
  } catch (error) {
    console.warn('RAG retrieval skipped:', error.message);
    return [];
  }
};
