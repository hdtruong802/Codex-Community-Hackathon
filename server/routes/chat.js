import express from 'express';
import OpenAI from 'openai';
import { characters } from '../data/characters.js';
import { retrieveRagContext } from '../rag/retriever.js';
import { buildGuardrailPolicy, evaluateGuardrails } from '../guardrails/evaluator.js';

const router = express.Router();
const ALLOWED_ROLES = new Set(['user', 'assistant']);
const MAX_MANUAL_RAG_ITEMS = 2;
const MAX_RAG_ITEMS_IN_PROMPT = 6;
const MAX_RAG_CONTENT_CHARS = 1600;
const MAX_SOURCE_EXCERPT_CHARS = 520;

const hasValidApiKey = () => {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  return Boolean(apiKey && !apiKey.includes('YOUR_API_KEY_HERE') && apiKey !== 'your_openai_api_key');
};

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!hasValidApiKey()) {
    console.warn('Warning: OPENAI_API_KEY is not properly set in environment variables.');
  }

  return new OpenAI({
    apiKey: apiKey || 'dummy-key-to-avoid-init-crash'
  });
};

const writeSse = (res, payload) => {
  res.write(`data: ${typeof payload === 'string' ? payload : JSON.stringify(payload)}\n\n`);
};

const clampNumber = (value, fallback, min, max) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
};

const MAX_SESSION_MESSAGES = clampNumber(process.env.CHAT_MEMORY_MAX_MESSAGES, 24, 4, 60);
const CHAT_MEMORY_TTL_MS = clampNumber(process.env.CHAT_MEMORY_TTL_MINUTES, 120, 5, 1440) * 60 * 1000;
const MAX_CHAT_SESSIONS = clampNumber(process.env.CHAT_MEMORY_MAX_SESSIONS, 200, 10, 2000);
const chatSessions = new Map();

const normalizeSessionId = (sessionId) => {
  if (typeof sessionId !== 'string') return null;
  const trimmed = sessionId.trim();
  return /^[A-Za-z0-9_-]{8,80}$/.test(trimmed) ? trimmed : null;
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
    .slice(-MAX_SESSION_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 4000)
    }));
};

const isSameMessage = (a, b) => (
  a?.role === b?.role && a?.content === b?.content
);

const mergeMessageHistories = (storedMessages, incomingMessages) => {
  if (!storedMessages.length) return incomingMessages.slice(-MAX_SESSION_MESSAGES);
  if (!incomingMessages.length) return storedMessages.slice(-MAX_SESSION_MESSAGES);

  const maxOverlap = Math.min(storedMessages.length, incomingMessages.length);
  let overlap = 0;

  for (let size = maxOverlap; size > 0; size -= 1) {
    const storedTail = storedMessages.slice(storedMessages.length - size);
    const incomingHead = incomingMessages.slice(0, size);
    if (storedTail.every((message, index) => isSameMessage(message, incomingHead[index]))) {
      overlap = size;
      break;
    }
  }

  return [
    ...storedMessages,
    ...incomingMessages.slice(overlap)
  ].slice(-MAX_SESSION_MESSAGES);
};

const pruneExpiredSessions = () => {
  const now = Date.now();

  for (const [key, session] of chatSessions.entries()) {
    if (now - session.updatedAt > CHAT_MEMORY_TTL_MS) {
      chatSessions.delete(key);
    }
  }

  if (chatSessions.size <= MAX_CHAT_SESSIONS) return;

  const oldestKeys = [...chatSessions.entries()]
    .sort((a, b) => a[1].updatedAt - b[1].updatedAt)
    .slice(0, chatSessions.size - MAX_CHAT_SESSIONS)
    .map(([key]) => key);

  oldestKeys.forEach((key) => chatSessions.delete(key));
};

const getSessionMessages = ({ characterId, sessionId }) => {
  if (!sessionId) return [];
  pruneExpiredSessions();
  return chatSessions.get(`${characterId}:${sessionId}`)?.messages || [];
};

const saveSessionMessages = ({ characterId, sessionId, messages }) => {
  if (!sessionId) return;
  pruneExpiredSessions();
  chatSessions.set(`${characterId}:${sessionId}`, {
    messages: messages.slice(-MAX_SESSION_MESSAGES),
    updatedAt: Date.now()
  });
};

const normalizeManualRagContext = (ragContext) => {
  if (!Array.isArray(ragContext)) return [];

  return ragContext
    .filter((item) => item && typeof item.content === 'string' && item.content.trim())
    .slice(0, MAX_MANUAL_RAG_ITEMS)
    .map((item) => ({
      content: item.content.trim().slice(0, MAX_RAG_CONTENT_CHARS),
      source: typeof item.source === 'string' ? item.source.trim().slice(0, 200) : undefined,
      citationLabel: typeof item.citationLabel === 'string' ? item.citationLabel.trim().slice(0, 200) : undefined,
      pageStart: Number.isFinite(Number(item.pageStart)) ? Number(item.pageStart) : undefined,
      pageEnd: Number.isFinite(Number(item.pageEnd)) ? Number(item.pageEnd) : undefined
    }));
};

const buildSources = (ragContext) => {
  const seen = new Set();

  return ragContext
    .filter((item) => item && (item.sourceFile || item.source || item.citationLabel))
    .map((item) => {
      const key = `${item.sourceFile || item.source || item.citationLabel}:${item.pageStart || ''}:${item.content || ''}`;
      if (seen.has(key)) return null;
      seen.add(key);

      return {
        label: item.citationLabel || item.source || item.sourceFile || 'Tư liệu',
        sourceFile: item.sourceFile,
        pageStart: item.pageStart,
        pageEnd: item.pageEnd,
        docType: item.docType,
        excerpt: String(item.content || '').trim().slice(0, MAX_SOURCE_EXCERPT_CHARS)
      };
    })
    .filter(Boolean)
    .slice(0, MAX_RAG_ITEMS_IN_PROMPT);
};

const getPublicOpenAiError = (error) => {
  const status = error.status || error.response?.status;
  const code = error.code || error.error?.code;

  if (status === 401) {
    return {
      error: 'OPENAI_API_KEY is invalid or expired.',
      code: code || 'openai_auth_error'
    };
  }

  if (status === 429) {
    return {
      error: 'OpenAI rate limit or quota was reached. Please try again later.',
      code: code || 'openai_rate_limit'
    };
  }

  if (status >= 500) {
    return {
      error: 'OpenAI service is temporarily unavailable. Please try again.',
      code: code || 'openai_server_error'
    };
  }

  return {
    error: error.message || 'Failed to stream chat response',
    code: code || 'openai_stream_error'
  };
};

const buildSystemPrompt = (character, ragContext = [], guardrailInstruction = '') => {
  const guardrailBlock = `${buildGuardrailPolicy()}${guardrailInstruction ? `\n\n=== HUONG DAN GUARDRAIL CHO LUOT NAY ===\n${guardrailInstruction}` : ''}`;

  if (!ragContext.length) {
    return `${guardrailBlock}\n\n${character.systemPrompt}`;
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

  return `${guardrailBlock}

${character.systemPrompt}

=== SỬ LIỆU RAG ĐƯỢC CUNG CẤP ===
Chỉ dùng các đoạn tư liệu dưới đây khi chúng liên quan trực tiếp đến câu hỏi. Nếu tư liệu không đủ, hãy nói rõ giới hạn thay vì bịa thêm.
Không tự thêm dòng "Sử liệu tham khảo" ở cuối câu trả lời; hệ thống sẽ hiển thị nguồn có thể bấm mở tài liệu.

${contextBlock}`;
};

router.post('/', async (req, res) => {
  const { characterId, messages, ragContext = [], sessionId: rawSessionId } = req.body || {};
  const character = characters[characterId];
  const sessionId = normalizeSessionId(rawSessionId);

  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }

  const recentMessages = normalizeMessages(messages);
  const storedMessages = getSessionMessages({ characterId, sessionId });
  const conversationMessages = mergeMessageHistories(storedMessages, recentMessages);

  if (recentMessages.length === 0 || recentMessages[recentMessages.length - 1].role !== 'user') {
    return res.status(400).json({
      error: 'messages must include at least one valid user message'
    });
  }

  const latestUserQuestion = recentMessages[recentMessages.length - 1].content;
  const guardrail = evaluateGuardrails({
    character,
    characterId,
    latestUserQuestion,
    conversationMessages
  });

  if (guardrail.decision !== 'block' && !hasValidApiKey()) {
    return res.status(503).json({
      error: 'OPENAI_API_KEY is missing or invalid. Create server/.env from server/.env.example before using chat.'
    });
  }

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  const abortController = new AbortController();
  res.on('close', () => {
    if (!res.writableEnded) {
      abortController.abort();
    }
  });

  try {
    if (guardrail.decision === 'block') {
      writeSse(res, { text: guardrail.refusalMessage });
      writeSse(res, {
        guardrail: {
          decision: guardrail.decision,
          category: guardrail.category,
          reason: guardrail.reason
        }
      });
      writeSse(res, '[DONE]');
      return;
    }

    const openai = getOpenAIClient();
    const maxTokens = clampNumber(process.env.OPENAI_MAX_TOKENS, 800, 100, 2000);
    const temperature = clampNumber(process.env.OPENAI_TEMPERATURE, 0.8, 0, 1.2);
    let assistantResponse = '';
    const autoRagContext = await retrieveRagContext({ characterId, question: latestUserQuestion });
    const mergedRagContext = [
      ...autoRagContext,
      ...normalizeManualRagContext(ragContext)
    ].slice(0, MAX_RAG_ITEMS_IN_PROMPT);
    const sources = buildSources(mergedRagContext);

    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      stream: true,
      messages: [
        { role: 'system', content: buildSystemPrompt(character, mergedRagContext, guardrail.guardrailInstruction) },
        ...conversationMessages
      ],
      temperature,
      max_tokens: maxTokens
    }, {
      signal: abortController.signal
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        assistantResponse += text;
        writeSse(res, { text });
      }
    }

    if (guardrail.decision === 'allow') {
      saveSessionMessages({
        characterId,
        sessionId,
        messages: [
          ...conversationMessages,
          { role: 'assistant', content: assistantResponse }
        ]
      });
    }

    if (guardrail.decision !== 'allow') {
      writeSse(res, {
        guardrail: {
          decision: guardrail.decision,
          category: guardrail.category,
          reason: guardrail.reason
        }
      });
    }

    if (sources.length) {
      writeSse(res, { sources });
    }
    writeSse(res, '[DONE]');
  } catch (error) {
    console.error('Error during OpenAI stream:', error);
    if (error.name !== 'AbortError') {
      writeSse(res, getPublicOpenAiError(error));
    }
  } finally {
    res.end();
  }
});

export default router;
