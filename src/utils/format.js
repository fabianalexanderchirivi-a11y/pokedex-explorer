export const getIdFromUrl = (url) => Number(url.split('/').filter(Boolean).pop());

// Concept: String method padStart — fills with zeros on the left to show ids like #025.
export const formatPokemonId = (id) => `#${String(id).padStart(3, '0')}`;

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export const getImageUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;