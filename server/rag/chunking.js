import crypto from 'crypto';

export const normalizeText = (text) => String(text || '')
  .replace(/\r\n/g, '\n')
  .replace(/[ \t]+\n/g, '\n')
  .replace(/\n{3,}/g, '\n\n')
  .replace(/[ \t]{2,}/g, ' ')
  .trim();

export const contentHash = (text) => (
  crypto.createHash('sha1').update(String(text || ''), 'utf8').digest('hex')
);

export const stablePointId = (...parts) => {
  const hash = crypto.createHash('sha1').update(parts.join('|'), 'utf8').digest('hex');
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    hash.slice(12, 16),
    hash.slice(16, 20),
    hash.slice(20, 32)
  ].join('-');
};

const splitParagraphs = (text) => normalizeText(text)
  .split(/\n\s*\n/g)
  .map((part) => part.trim())
  .filter(Boolean);

const estimateTokens = (text) => Math.ceil(String(text || '').length / 4);

export const chunkText = ({ text, docType }) => {
  const paragraphs = splitParagraphs(text);
  const targetTokens = docType === 'style' ? 280 : 620;
  const overlapTokens = docType === 'style' ? 60 : 110;
  const chunks = [];
  let current = [];
  let currentTokens = 0;

  const pushCurrent = () => {
    if (!current.length) return;
    chunks.push(normalizeText(current.join('\n\n')));
  };

  for (const paragraph of paragraphs) {
    const paragraphTokens = estimateTokens(paragraph);

    if (currentTokens + paragraphTokens > targetTokens && current.length) {
      pushCurrent();

      const overlap = [];
      let tokens = 0;
      for (let i = current.length - 1; i >= 0; i -= 1) {
        const itemTokens = estimateTokens(current[i]);
        if (tokens + itemTokens > overlapTokens) break;
        overlap.unshift(current[i]);
        tokens += itemTokens;
      }

      current = overlap;
      currentTokens = tokens;
    }

    current.push(paragraph);
    currentTokens += paragraphTokens;
  }

  pushCurrent();
  return chunks.filter((chunk) => docType === 'style' || chunk.length >= 80);
};

export const keywordScore = (question, payload) => {
  const normalizedQuestion = String(question || '').toLowerCase();
  const tags = Array.isArray(payload.tags) ? payload.tags : [];
  const tagHits = tags.filter((tag) => normalizedQuestion.includes(String(tag).toLowerCase())).length;

  const title = String(payload.sourceTitle || '').toLowerCase();
  const titleHits = title
    .split(/\s+/)
    .filter((word) => word.length > 4 && normalizedQuestion.includes(word))
    .length;

  return Math.min(1, (tagHits * 0.2) + (titleHits * 0.05));
};
