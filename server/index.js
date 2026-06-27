import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import charactersRouter from './routes/characters.js';
import chatRouter from './routes/chat.js';
import { characters } from './data/characters.js';
import { getQdrantHealth } from './rag/qdrant.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || 'http://localhost:3000,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// CORS middleware supporting both Next.js (3000) and Vite (5173) local origins
app.use(cors({
  origin: CLIENT_ORIGINS
}));

app.use(express.json());

// Routing
app.use('/api/characters', charactersRouter);
app.use('/api/chat', chatRouter);

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  const hasOpenAiKey = Boolean(
    process.env.OPENAI_API_KEY
    && process.env.OPENAI_API_KEY !== 'your_openai_api_key'
    && !process.env.OPENAI_API_KEY.includes('YOUR_API_KEY_HERE')
  );

  const rag = await getQdrantHealth();

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'suvietai-backend',
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    hasOpenAiKey,
    characterCount: Object.keys(characters).length,
    rag
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 SửViệtAI Server running at http://localhost:${PORT}`);
});
