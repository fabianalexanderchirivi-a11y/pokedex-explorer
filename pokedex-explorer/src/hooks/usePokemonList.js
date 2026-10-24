import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPokemonList, PAGE_SIZE } from '../services/pokeApi';

export default function usePokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // first page
  const [isLoadingMore, setIsLoadingMore] = useState(false); // next pages
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
    // Concept: useRef — keeps values between renders without triggering a re-render.
  const offsetRef = useRef(0);
  const isFetchingRef = useRef(false);

  const loadPage = useCallback(async () => {
    if (isFetchingRef.current) return; 
    isFetchingRef.current = true;

    if (offsetRef.current === 0) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      const data = await fetchPokemonList(offsetRef.current, PAGE_SIZE);
      setPokemon((previous) => [...previous, ...data.items]);
      offsetRef.current += PAGE_SIZE;
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  // Concept: useEffect with dependency array. loadPage never changes,
  // so this runs only once, when the app opens.
  useEffect(() => {
    loadPage();
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (hasMore && !error) loadPage();
  }, [hasMore, error, loadPage]);

  return { pokemon, isLoading, isLoadingMore, error, hasMore, loadMore, retry: loadPage };
}