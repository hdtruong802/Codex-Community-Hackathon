import express from 'express';
import { characters } from '../data/characters.js';

const router = express.Router();

const toPublicCharacter = ([id, c]) => ({
  id,
  name: c.name,
  emoji: c.emoji,
  period: c.period,
  shortBio: c.shortBio,
  topics: c.topics,
  suggestedQuestions: c.suggestedQuestions,
  color: c.color
});

// GET all characters (excluding systemPrompt for minimal payload size)
router.get('/', (req, res) => {
  try {
    const list = Object.entries(characters).map(toPublicCharacter);
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch characters list' });
  }
});

// GET one character by id (also excludes systemPrompt)
router.get('/:id', (req, res) => {
  const character = characters[req.params.id];

  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }

  res.json(toPublicCharacter([req.params.id, character]));
});

export default router;
