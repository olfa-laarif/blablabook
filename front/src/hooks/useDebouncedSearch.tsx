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

// import { useState, useEffect } from "react";

// type SearchFunction = (query: string) => void;

// /**
//  * Hook personnalisé pour gérer la recherche avec un délai (debounce)
//  */
// export function useDebouncedSearch(searchFunction: SearchFunction, delay: number = 1000) {
//   const [query, setQuery] = useState<string>("");
//   const [debouncedQuery, setDebouncedQuery] = useState<string>("");

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(query);
//     }, delay);

//     return () => clearTimeout(handler); // Réinitialise le timer à chaque frappe
//   }, [query, delay]);

//   useEffect(() => {
//     if (debouncedQuery) {
//       searchFunction(debouncedQuery);
//     }
//   }, [debouncedQuery, searchFunction]);

//   return { query, setQuery };
// }