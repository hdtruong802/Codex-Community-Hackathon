import { characters } from '../data/characters.js';

const expectedIds = ['tran_hung_dao', 'ly_thuong_kiet', 'ho_xuan_huong'];
const missingIds = expectedIds.filter((id) => !characters[id]);

if (missingIds.length > 0) {
  throw new Error(`Missing demo characters: ${missingIds.join(', ')}`);
}

for (const [id, character] of Object.entries(characters)) {
  const requiredFields = ['name', 'emoji', 'period', 'shortBio', 'topics', 'suggestedQuestions', 'color', 'systemPrompt'];
  const missingFields = requiredFields.filter((field) => !character[field]);

  if (missingFields.length > 0) {
    throw new Error(`${id} is missing fields: ${missingFields.join(', ')}`);
  }

  if (!Array.isArray(character.topics) || character.topics.length === 0) {
    throw new Error(`${id} must have at least one topic`);
  }

  if (!Array.isArray(character.suggestedQuestions) || character.suggestedQuestions.length === 0) {
    throw new Error(`${id} must have at least one suggested question`);
  }
}

console.log(`Backend check passed for ${Object.keys(characters).length} demo characters.`);
