import { Book } from "../types";
import { BookCard } from "./BookCardUser";

interface BookListProps {
  books: Book[];
  fetchUserLibrary?: () => void; // Rendu optionnel avec `?`
}


const BookList = ({ books, fetchUserLibrary  }: BookListProps) => {
  if (!books.length) {
    return <p className="text-center py-4">Aucun livre trouvé.</p>;
  }

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} fetchUserLibrary={fetchUserLibrary} />
      ))}
    </div>
  );
};

export default BookList;
