import { ragConfig } from './config.js';
import { ocrImageWithTesseract } from './local-ocr.js';
import { ocrImage as ocrImageOpenAI } from './openai.js';

export const ocrImage = async (imagePath) => {
  if (ragConfig.ocrProvider === 'openai') {
    return ocrImageOpenAI(imagePath);
  }

  return ocrImageWithTesseract(imagePath);
};
