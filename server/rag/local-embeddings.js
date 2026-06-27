import crypto from 'crypto';
import { ragConfig } from './config.js';

const stripDiacritics = (value) => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

const tokenize = (text) => {
  const normalized = stripDiacritics(text)
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = normalized.split(' ').filter((word) => word.length >= 2);
  const features = [...words];

  for (const word of words) {
    if (word.length < 4) continue;
    for (let i = 0; i <= word.length - 3; i += 1) {
      features.push(`tri:${word.slice(i, i + 3)}`);
    }
  }

  for (let i = 0; i < words.length - 1; i += 1) {
    features.push(`bi:${words[i]}_${words[i + 1]}`);
  }

  return features;
};

const hashFeature = (feature) => {
  const digest = crypto.createHash('sha1').update(feature, 'utf8').digest();
  const bucket = digest.readUInt32BE(0) % ragConfig.vectorSize;
  const sign = digest[4] % 2 === 0 ? 1 : -1;
  return { bucket, sign };
};

export const embedTextLocal = async (text) => {
  const features = tokenize(text);

  if (!features.length) {
    throw new Error('Cannot embed empty text');
  }

  const vector = new Array(ragConfig.vectorSize).fill(0);
  const counts = new Map();

  for (const feature of features) {
    counts.set(feature, (counts.get(feature) || 0) + 1);
  }

  for (const [feature, count] of counts.entries()) {
    const { bucket, sign } = hashFeature(feature);
    vector[bucket] += sign * (1 + Math.log(count));
  }

  const norm = Math.sqrt(vector.reduce((sum, value) => sum + (value * value), 0)) || 1;
  return vector.map((value) => value / norm);
};
