import { ragConfig } from './config.js';

const QDRANT_TIMEOUT_MS = Number(process.env.QDRANT_TIMEOUT_MS || 3000);

const qdrantHeaders = () => ({
  'Content-Type': 'application/json',
  ...(ragConfig.qdrantApiKey ? { 'api-key': ragConfig.qdrantApiKey } : {})
});

const qdrantFetch = async (path, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), QDRANT_TIMEOUT_MS);
  let response;

  try {
    response = await fetch(`${ragConfig.qdrantUrl}${path}`, {
      ...options,
      signal: options.signal || controller.signal,
      headers: {
        ...qdrantHeaders(),
        ...(options.headers || {})
      }
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`Qdrant request timed out after ${QDRANT_TIMEOUT_MS}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const body = await response.text();
    const error = new Error(`Qdrant ${response.status}: ${body}`);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return null;
  return response.json();
};

export const getQdrantHealth = async () => {
  try {
    await qdrantFetch('/collections');
    try {
      await qdrantFetch(`/collections/${encodeURIComponent(ragConfig.collection)}`);
      return {
        provider: 'qdrant',
        connected: true,
        collection: ragConfig.collection,
        collectionReady: true
      };
    } catch (error) {
      return {
        provider: 'qdrant',
        connected: true,
        collection: ragConfig.collection,
        collectionReady: false,
        error: error.message
      };
    }
  } catch (error) {
    return {
      provider: 'qdrant',
      connected: false,
      collection: ragConfig.collection,
      error: error.message
    };
  }
};

export const ensureCollection = async () => {
  const collectionPath = `/collections/${encodeURIComponent(ragConfig.collection)}`;

  try {
    await qdrantFetch(collectionPath);
  } catch (error) {
    if (error.status && error.status !== 404) {
      throw error;
    }

    await qdrantFetch(collectionPath, {
      method: 'PUT',
      body: JSON.stringify({
        vectors: {
          size: ragConfig.vectorSize,
          distance: 'Cosine'
        }
      })
    });
  }

  const indexedFields = ['characterId', 'docType', 'quality', 'sourceFile', 'tags'];

  for (const fieldName of indexedFields) {
    try {
      await qdrantFetch(`${collectionPath}/index`, {
        method: 'PUT',
        body: JSON.stringify({
          field_name: fieldName,
          field_schema: fieldName === 'tags' ? 'keyword' : 'keyword'
        })
      });
    } catch (error) {
      if (!String(error.message).includes('already exists')) {
        console.warn(`Could not create Qdrant payload index for ${fieldName}:`, error.message);
      }
    }
  }
};

export const upsertPoints = async (points) => {
  if (!points.length) return { upserted: 0 };

  await qdrantFetch(`/collections/${encodeURIComponent(ragConfig.collection)}/points?wait=true`, {
    method: 'PUT',
    body: JSON.stringify({ points })
  });

  return { upserted: points.length };
};

export const searchPoints = async ({ vector, characterId, docType, limit }) => {
  const must = [
    { key: 'characterId', match: { value: characterId } },
    { key: 'quality', match: { value: 'clean' } }
  ];

  if (docType) {
    must.push({ key: 'docType', match: { value: docType } });
  }

  const body = {
    vector,
    limit,
    with_payload: true,
    with_vector: false,
    filter: { must }
  };

  const response = await qdrantFetch(`/collections/${encodeURIComponent(ragConfig.collection)}/points/search`, {
    method: 'POST',
    body: JSON.stringify(body)
  });

  return response.result || [];
};
