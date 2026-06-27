import dotenv from 'dotenv';
import { getQdrantHealth } from '../../rag/qdrant.js';

dotenv.config();

console.log(JSON.stringify(await getQdrantHealth(), null, 2));
