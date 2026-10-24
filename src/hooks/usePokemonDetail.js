import { useState, useEffect } from 'react';
import { fetchPokemonDetail } from '../services/pokeApi';

export default function usePokemonDetail(query) {
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState('loading');
  const [reloadKey, setReloadKey] = useState(0);
  // Concept: useEffect (dependency array) 
  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setStatus('loading');
      try {
        const data = await fetchPokemonDetail(query);
        if (isCancelled) return;
        setPokemon(data);
        setStatus('success');
      } catch (err) {
        if (isCancelled) return;
        setStatus(err.status === 404 ? 'notFound' : 'error');
      }
    }
    load();
    // Concept: useEffect cleanup function — if the user leaves or searches again,
    // the old response is ignored.
    return () => {
      isCancelled = true;
    };
  }, [query, reloadKey]);

  const retry = () => setReloadKey((key) => key + 1);

  return { pokemon, status, retry };
}