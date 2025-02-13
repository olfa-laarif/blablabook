/* eslint-disable no-case-declarations */
export function filterBooks(books, query, searchOption) {
    if (!query) return books;

    const lowerCaseQuery = query.toLowerCase();

    return books
      .filter(book => {
        switch (searchOption) {
          case "title":
            return book.title.toLowerCase().includes(lowerCaseQuery);
          case "author":
            // Vérifier si book.Author existe et contient firstname et lastname
            if (!book.Author || !book.Author.firstname || !book.Author.lastname) return false;

            const firstNameMatch = book.Author.firstname.toLowerCase().includes(lowerCaseQuery);
            const lastNameMatch = book.Author.lastname.toLowerCase().includes(lowerCaseQuery);

            console.log(`Searching for "${lowerCaseQuery}" in "${book.Author.firstname} ${book.Author.lastname}"`);
            return firstNameMatch || lastNameMatch;
          case "published_date":
            return book.published_date.includes(lowerCaseQuery);
          default:
            return false;
        }
      })
      .filter((book, index, self) => self.findIndex(b => b.id === book.id) === index); // Supprime les doublons
}
