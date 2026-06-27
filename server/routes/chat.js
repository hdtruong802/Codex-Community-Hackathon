import express from 'express';
import OpenAI from 'openai';
import { characters } from '../data/characters.js';

const router = express.Router();

// Initialize OpenAI. It will look for process.env.OPENAI_API_KEY.
// Fallback to a placeholder if not set to prevent initial crash, but error will be streamed on call.
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.includes('YOUR_API_KEY_HERE')) {
    console.warn('⚠️ Warning: OPENAI_API_KEY is not properly set in environment variables.');
  }
  return new OpenAI({
    apiKey: apiKey || 'dummy-key-to-avoid-init-crash'
  });
};

const openai = getOpenAIClient();

router.post('/', async (req, res) => {
  const { characterId, messages } = req.body;
  const character = characters[characterId];

  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }

  // Set SSE Headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Ensure CORS fits all client callers

  try {
    // Slices last 10 messages to limit context and tokens
    const recentMessages = Array.isArray(messages) ? messages.slice(-10) : [];

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [
        { role: 'system', content: character.systemPrompt },
        ...recentMessages
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
  } catch (error) {
    console.error('Error during OpenAI stream:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
  } finally {
    res.end();
  }
});

export default router;
