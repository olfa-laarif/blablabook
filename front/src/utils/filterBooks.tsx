/* eslint-disable no-case-declarations */
import type { Book } from "../types";

/**
 * Filtre les livres selon le critère choisi (titre, auteur, date de publication)
 * @param books - Liste des livres
 * @param query - Texte saisi par l'utilisateur
 * @param searchOption - Filtre sélectionné : "title", "author", "published_date"
 * @returns Liste des livres filtrés
 */
export function filterBooks(books: Book[], query: string, searchOption: string): Book[] {
  if (!query.trim()) return books; // Si la recherche est vide, on retourne tous les livres

  const lowerCaseQuery = query.toLowerCase();

  const filteredBooks = books.filter((book: Book) => {
    switch (searchOption) {
      case "title":
        return book.title?.toLowerCase().includes(lowerCaseQuery) ?? false;

      case "author":
        if (!book.Author) return false;
        const firstNameMatch = book.Author.firstname?.toLowerCase().includes(lowerCaseQuery) ?? false;
        const lastNameMatch = book.Author.lastname?.toLowerCase().includes(lowerCaseQuery) ?? false;
        return firstNameMatch || lastNameMatch;

      case "published_date":
        return book.published_date?.includes(lowerCaseQuery) ?? false;

      default:
        return false;
    }
  });

  // Suppression des doublons avec `Set`
  return Array.from(new Set(filteredBooks.map((book) => book.id))).map(
    (id) => filteredBooks.find((book) => book.id === id)!
  );
}





