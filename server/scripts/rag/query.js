import dotenv from 'dotenv';
import { retrieveRagContext } from '../../rag/retriever.js';

dotenv.config();

const characterId = process.argv[2];
const question = process.argv.slice(3).join(' ');

if (!characterId || !question) {
  console.error('Usage: npm run rag:query -- <characterId> <question>');
  process.exit(1);
}

const results = await retrieveRagContext({ characterId, question });

console.log(JSON.stringify({
  characterId,
  question,
  results
}, null, 2));
