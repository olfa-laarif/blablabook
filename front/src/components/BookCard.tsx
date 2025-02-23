import  { Book } from '../types';
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book}: BookCardProps) {

  return (
    
    <Link to={`/books/${book.id}`} className="block">
      <div className="bg-white  rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          className="w-full aspect-[3/4] object-contain mx-auto"
        />
        <div className="p-4">
          {/* Titre limité à 2 lignes */}
          <h3 className="text-lg font-semibold text-gray-900  h-14 line-clamp-2 mb-1">{book.title} </h3>
          <p className="text-gray-600 text-sm mb-2">par {book.Author.firstname} {book.Author.lastname}</p>
        </div>
      </div>
      </Link>
    
  );
}