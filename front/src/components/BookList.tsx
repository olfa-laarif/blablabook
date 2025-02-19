import React from "react";
import { Book } from "../types"; // chemin vers votre interface Book
import BookCard from "./BookCard"; // Un composant pour afficher un livre

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  if (!books.length) {
    return <p className="text-center py-4">Aucun livre trouvé.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
