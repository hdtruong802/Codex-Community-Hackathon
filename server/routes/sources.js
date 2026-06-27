import express from 'express';
import fs from 'fs';
import path from 'path';
import { docsRoot, repoRoot } from '../rag/config.js';

const router = express.Router();

const resolveSourcePath = (sourceFile) => {
  const normalized = String(sourceFile || '').replace(/\\/g, '/');

  if (!normalized.startsWith('docs/')) {
    return null;
  }

  const absolutePath = path.resolve(repoRoot, normalized);
  const docsRootWithSeparator = `${docsRoot}${path.sep}`;

  if (absolutePath !== docsRoot && !absolutePath.startsWith(docsRootWithSeparator)) {
    return null;
  }

  return absolutePath;
};

router.get('/document', (req, res) => {
  const absolutePath = resolveSourcePath(req.query.path);

  if (!absolutePath || !fs.existsSync(absolutePath)) {
    return res.status(404).json({ error: 'Source document not found' });
  }

  res.sendFile(absolutePath, {
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  });
});

export default router;
