// import type { Book as BookType } from '../types';
// import { Link } from "react-router-dom";

// interface BookCardProps {
//   book: BookType;
//   onAddToRead?: () => void;
//   onAddToReadLater?: () => void;
// }

// export default function BookCard({ book}: BookCardProps) {

//   return (
    
//     <Link to={`/books/${book.id}`} className="block">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
//         <img
//           src={book.image}
//           alt={`Cover of ${book.title}`}
//           className="w-full h-48 object-cover"
//         />
//         <div className="p-4">
//           <h3 className="text-lg font-semibold text-gray-900 mb-1 h-12">{book.title} </h3>
//           <p className="text-gray-600 text-sm mb-2">par {book.Author.firstname} {book.Author.lastname}</p>
//         </div>
//       </div>
//       </Link>
    
//   );
// }
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Book } from "../types";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
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
    // Conteneur avec une largeur fixe et alignement centré
    <div className="w-64 mx-auto border rounded-lg shadow p-4 bg-white relative">
      {/* Conteneur de l'image avec hauteur fixe pour uniformiser toutes les cartes */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Informations sur le livre */}
      <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
      <p className="text-sm text-gray-600">
        {book.Author.firstname} {book.Author.lastname}
      </p>
      <p className="text-sm text-gray-500">
        {new Date(book.published_date).toLocaleDateString('fr-FR')}
      </p>
      {/* Boutons + et – positionnés en haut à droite */}
      <div className="absolute top-2 right-2 flex flex-col space-y-1">
        <div className="group relative">
          <button
            onClick={handleAdd}
            className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600"
          >
            <Plus size={12} />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 hidden group-hover:block text-xs text-gray-700 bg-gray-200 px-2 py-1 rounded">
            Ajouter à votre bibliothèque
          </span>
        </div>
        <div className="group relative">
          <button
            onClick={handleRemove}
            className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600"
          >
            <Minus size={12} />
          </button>
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 hidden group-hover:block text-xs text-gray-700 bg-gray-200 px-2 py-1 rounded">
            Enlever de votre bibliothèque
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
