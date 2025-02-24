import { Book } from "../types"; // chemin vers votre interface Book
import { BookCard } from "./BookCardUser"; // Un composant pour afficher un livre

interface BookListProps {
  books: Book[];
}

const BookList = ({ books }:BookListProps) => {

  
  if (!books.length) {
    return <p className="text-center py-4">Aucun livre trouvé.</p>;
  }

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
