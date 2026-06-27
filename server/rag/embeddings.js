import { ragConfig } from './config.js';
import { embedTextLocal } from './local-embeddings.js';
import { embedTextOpenAI } from './openai.js';

export const embedText = async (text) => {
  if (ragConfig.embeddingProvider === 'openai') {
    return embedTextOpenAI(text);
  }

  return embedTextLocal(text);
};
