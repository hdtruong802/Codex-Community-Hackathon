import fs from 'fs/promises';
import OpenAI from 'openai';
import { ragConfig } from './config.js';

let openaiClient;

export const getOpenAIClient = () => {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy-key-to-avoid-init-crash'
    });
  }
  return openaiClient;
};

export const embedTextOpenAI = async (text) => {
  const input = String(text || '').trim();

  if (!input) {
    throw new Error('Cannot embed empty text');
  }

  const response = await getOpenAIClient().embeddings.create({
    model: ragConfig.embeddingModel,
    input
  });

  return response.data[0].embedding;
};

export const ocrImage = async (imagePath) => {
  const imageBuffer = await fs.readFile(imagePath);
  const base64 = imageBuffer.toString('base64');

  const response = await getOpenAIClient().chat.completions.create({
    model: ragConfig.ocrModel,
    temperature: 0,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: 'Extract Vietnamese historical document text from page images. Return only valid JSON.'
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'OCR this page. Return JSON with keys: page, text, headings, notes, confidence, warnings. Preserve Vietnamese accents and do not invent missing text.'
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/png;base64,${base64}`
            }
          }
        ]
      }
    ]
  });

  const content = response.choices[0]?.message?.content || '{}';
  return JSON.parse(content);
};
