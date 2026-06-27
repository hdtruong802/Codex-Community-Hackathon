import { ragConfig } from './config.js';

const qdrantHeaders = () => ({
  'Content-Type': 'application/json',
  ...(ragConfig.qdrantApiKey ? { 'api-key': ragConfig.qdrantApiKey } : {})
});

const qdrantFetch = async (path, options = {}) => {
  const response = await fetch(`${ragConfig.qdrantUrl}${path}`, {
    ...options,
    headers: {
      ...qdrantHeaders(),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Qdrant ${response.status}: ${body}`);
  }

  if (response.status === 204) return null;
  return response.json();
};

export const getQdrantHealth = async () => {
  try {
    await qdrantFetch('/collections');
    return { provider: 'qdrant', connected: true, collection: ragConfig.collection };
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
