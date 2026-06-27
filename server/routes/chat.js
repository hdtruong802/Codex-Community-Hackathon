import express from 'express';
import OpenAI from 'openai';
import { characters } from '../data/characters.js';
import { retrieveRagContext } from '../rag/retriever.js';

const router = express.Router();
const ALLOWED_ROLES = new Set(['user', 'assistant']);

const hasValidApiKey = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  return Boolean(apiKey && !apiKey.includes('YOUR_API_KEY_HERE') && apiKey !== 'your_openai_api_key');
};

// Initialize OpenAI. It will look for process.env.OPENAI_API_KEY.
// Fallback to a placeholder if not set to prevent initial crash, but error will be streamed on call.
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!hasValidApiKey()) {
    console.warn('⚠️ Warning: OPENAI_API_KEY is not properly set in environment variables.');
  }
  return new OpenAI({
    apiKey: apiKey || 'dummy-key-to-avoid-init-crash'
  });
};

const writeSse = (res, payload) => {
  res.write(`data: ${typeof payload === 'string' ? payload : JSON.stringify(payload)}\n\n`);
};

const normalizeMessages = (messages) => {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message) => (
      message
      && ALLOWED_ROLES.has(message.role)
      && typeof message.content === 'string'
      && message.content.trim().length > 0
    ))
    .slice(-10)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 4000)
    }));
};

const buildSystemPrompt = (character, ragContext = []) => {
  if (!ragContext.length) {
    return character.systemPrompt;
  }

  const contextBlock = ragContext
    .map((item, index) => {
      const source = item.citationLabel || item.source || 'chưa rõ';
      const pageRange = item.citationLabel || !item.pageStart
        ? ''
        : `, trang ${item.pageStart}${item.pageEnd && item.pageEnd !== item.pageStart ? `-${item.pageEnd}` : ''}`;
      return `[${index + 1}] ${item.content}\nNguồn: ${source}${pageRange}`;
    })
    .join('\n\n');

  return `${character.systemPrompt}

═══ SỬ LIỆU RAG ĐƯỢC CUNG CẤP ═══
Chỉ dùng các đoạn tư liệu dưới đây khi chúng liên quan trực tiếp đến câu hỏi. Nếu tư liệu không đủ, hãy nói rõ giới hạn thay vì bịa thêm.

${contextBlock}`;
};

router.post('/', async (req, res) => {
  const { characterId, messages, ragContext = [] } = req.body || {};
  const character = characters[characterId];

  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }

  if (!hasValidApiKey()) {
    return res.status(503).json({
      error: 'OPENAI_API_KEY is missing or invalid. Create server/.env from server/.env.example before using chat.'
    });
  }

  const recentMessages = normalizeMessages(messages);

  if (recentMessages.length === 0 || recentMessages[recentMessages.length - 1].role !== 'user') {
    return res.status(400).json({
      error: 'messages must include at least one valid user message'
    });
  }

  // Set SSE Headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Ensure CORS fits all client callers

  try {
    const openai = getOpenAIClient();
    const maxTokens = Number(process.env.OPENAI_MAX_TOKENS || 800);
    const latestUserQuestion = recentMessages[recentMessages.length - 1].content;
    const autoRagContext = await retrieveRagContext({ characterId, question: latestUserQuestion });
    const mergedRagContext = [
      ...autoRagContext,
      ...(Array.isArray(ragContext) ? ragContext : [])
    ];

    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      stream: true,
      messages: [
        { role: 'system', content: buildSystemPrompt(character, mergedRagContext) },
        ...recentMessages
      ],
      temperature: 0.8,
      max_tokens: Number.isFinite(maxTokens) ? maxTokens : 800,
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        writeSse(res, { text });
      }
    }
    writeSse(res, '[DONE]');
  } catch (error) {
    console.error('Error during OpenAI stream:', error);
    writeSse(res, { error: error.message || 'Failed to stream chat response' });
  } finally {
    res.end();
  }
});

export default router;
