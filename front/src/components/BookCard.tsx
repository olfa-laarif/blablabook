import type { Book as BookType } from '../types';

interface BookCardProps {
  book: BookType;
  onAddToRead?: () => void;
  onAddToReadLater?: () => void;
}

export default function BookCard({ book}: BookCardProps) {

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img
          src={book.coverUrl}
          alt={`Cover of ${book.title}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">par {book.author}</p>
          <p className="text-gray-500 text-sm mb-4">{book.genre}</p>
        </div>
      </div>
    </>
  );
}