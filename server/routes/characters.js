import express from 'express';
import { characters } from '../data/characters.js';

const router = express.Router();

// GET all characters (excluding systemPrompt for minimal payload size)
router.get('/', (req, res) => {
  try {
    const list = Object.entries(characters).map(([id, c]) => ({
      id,
      name: c.name,
      emoji: c.emoji,
      period: c.period,
      shortBio: c.shortBio,
      topics: c.topics,
      suggestedQuestions: c.suggestedQuestions,
      color: c.color
    }));
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch characters list' });
  }
});

export default router;
