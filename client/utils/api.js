export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const getCharacters = async () => {
  const response = await fetch(`${API_BASE_URL}/api/characters`);
  if (!response.ok) {
    throw new Error('Failed to fetch historical characters');
  }
  return response.json();
};

export const getCharacterDetails = async (id) => {
  const list = await getCharacters();
  return list.find((c) => c.id === id) || null;
};
