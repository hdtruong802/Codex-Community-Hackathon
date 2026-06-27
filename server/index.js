import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import charactersRouter from './routes/characters.js';
import chatRouter from './routes/chat.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS middleware supporting both Next.js (3000) and Vite (5173) local origins
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173']
}));

app.use(express.json());

// Routing
app.use('/api/characters', charactersRouter);
app.use('/api/chat', chatRouter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'suvietai-backend'
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 SửViệtAI Server running at http://localhost:${PORT}`);
});
