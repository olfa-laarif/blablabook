import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour gérer la recherche avec un délai (debounce)
 */
export function useDebouncedSearch(initialQuery = "", delay = 1000) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(handler); // Réinitialise le timer à chaque frappe
  }, [query, delay]);

  return { query, setQuery, debouncedQuery };
}
