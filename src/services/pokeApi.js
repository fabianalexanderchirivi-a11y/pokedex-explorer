import { getIdFromUrl, getImageUrl } from '../utils/format';

const BASE_URL = 'https://pokeapi.co/api/v2';
export const PAGE_SIZE = 20;

// Concept: network logic separated from the UI — this is the only file that calls fetch.

// Concept: fetch with async/await — request to the API; check response.ok BEFORE
// response.json(), because a missing pokemon answers 404 with plain text, not JSON.
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
  const cleanQuery = String(query).trim().toLowerCase().replace(/^#/, '');
  if (cleanQuery === '') {
    const error = new Error('Empty search');
    error.status = 404;
    throw error;
  }
  const isNumber = /^\d+$/.test(cleanQuery);
  const path = isNumber ? String(Number(cleanQuery)) : encodeURIComponent(cleanQuery);

  const data = await request(`/pokemon/${path}`);
  return {
    id: data.id,
    name: data.name,
    // height is in decimeters and weight in hectograms
    height: data.height / 10,
    weight: data.weight / 10,
    types: data.types.map((item) => item.type.name),
    stats: data.stats.map((item) => ({ name: item.stat.name, value: item.base_stat })),
    image: data.sprites?.other?.['official-artwork']?.front_default ?? getImageUrl(data.id),
  };
}