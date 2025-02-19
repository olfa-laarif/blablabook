
import type { Book} from '../types';
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

interface BookCardProps {
  book: Book;
}

 export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [inLibrary, setInLibrary] = useState(false);

  const handleAdd = () => {
    // Logique pour ajouter le livre à la bibliothèque
    setInLibrary(true);
  };

  const handleRemove = () => {
    // Logique pour retirer le livre de la bibliothèque
    setInLibrary(false);
  };


  return (
    // Conteneur relatif pour positionner les boutons absolument par rapport à la carte
    <div className="relative">
      {/* Le lien enveloppe la carte pour la navigation vers le détail du livre */}
      <Link to={`/books/${book.id}`} className="block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
          <img
            src={book.image}
            alt={`Cover of ${book.title}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 h-12">{book.title}</h3>
            <p className="text-gray-600 text-sm mb-2">
              par {book.Author.firstname} {book.Author.lastname}
            </p>
          </div>
        </div>
      </Link>
      {/* Boutons + et - positionnés en haut à droite de la carte */}
      <div className="absolute bottom-2 right-2 flex flex-row space-x-5">
        {inLibrary ? (
          <button 
            onClick={handleRemove}
            className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600"
            title="Enlever de votre bibliothèque"
          >
            <Minus size={12} />
          </button>
        ) : (
          <button 
            onClick={handleAdd}
            className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600"
            title="Ajouter à votre bibliothèque"
          >
            <Plus size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
