import type { Book as BookType } from '../types';
import { Link } from "react-router-dom";
import slugify from 'slugify';

interface BookCardProps {
  book: BookType;
  onAddToRead?: () => void;
  onAddToReadLater?: () => void;
}

export default function BookCard({ book}: BookCardProps) {

  const slug = slugify(book.title, { lower: true, strict: true });

  return (
    // Ajout du slug pour rendre l'URL SEO friendly
    <Link to={`/books/${book.id}-${slug}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 h-12">{book.title} </h3>
          <p className="text-gray-600 text-sm mb-2">par {book.Author.firstname} {book.Author.lastname}</p>
        </div>
      </div>
      </Link>
    
  );
}