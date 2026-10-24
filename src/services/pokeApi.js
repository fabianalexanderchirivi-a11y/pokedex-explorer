import { getIdFromUrl, getImageUrl } from '../utils/format';

const BASE_URL = 'https://pokeapi.co/api/v2';
export const PAGE_SIZE = 20;

// Concept: fetch with async/await. Check response.ok BEFORE response.json()
async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function fetchPokemonList(offset = 0, limit = PAGE_SIZE) {
  const data = await request(`/pokemon?limit=${limit}&offset=${offset}`);
  return {
    hasMore: data.next !== null,
    items: data.results.map((item) => ({
      id: getIdFromUrl(item.url),
      name: item.name,
    })),
  };
}
export async function fetchPokemonDetail(query) {
  const cleanQuery = String(query).trim().toLowerCase();
  if (cleanQuery === '') {
    const error = new Error('Empty search');
    error.status = 404;
    throw error;
  }

  const data = await request(`/pokemon/${cleanQuery}`);
  return {
    id: data.id,
    name: data.name,
    height: data.height / 10,
    weight: data.weight / 10,
    types: data.types.map((item) => item.type.name),
    stats: data.stats.map((item) => ({ name: item.stat.name, value: item.base_stat })),
    image: data.sprites?.other?.['official-artwork']?.front_default ?? getImageUrl(data.id),
  };
}