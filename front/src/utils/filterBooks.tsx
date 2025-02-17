import type { Book } from "../types";


export function filterBooks(books: Book[], query: string, searchOption: string): Book[] {
  if (!query) return books;

  const lowerCaseQuery = query.toLowerCase();

  return books
   // Filtrer le tableau de livres en fonction du critère choisi.
    .filter((book: Book) => {
      switch (searchOption) {
        case "title":
          return book.title.toLowerCase().includes(lowerCaseQuery);
        case "author":
          // Vérifier si book.Author existe et contient firstname et lastname
          { if (!book.Author || !book.Author.firstname || !book.Author.lastname) return false;
            // Vérifier si le prénom ou le nom de l'auteur correspond à la requête.
          const firstNameMatch = book.Author.firstname.toLowerCase().includes(lowerCaseQuery);
          const lastNameMatch = book.Author.lastname.toLowerCase().includes(lowerCaseQuery);
          console.log(`Searching for "${lowerCaseQuery}" in "${book.Author.firstname} ${book.Author.lastname}"`);
          return firstNameMatch || lastNameMatch; }
        case "published_date":
          return book.published_date.includes(lowerCaseQuery);
        default:
          return false;
      }
    })
     // Supprimer les doublons en vérifiant l'unicité de l'identifiant de chaque livre.
    .filter((book: Book, index: number, self: Book[]) =>
      self.findIndex((b: Book) => b.id === book.id) === index
    );
}
