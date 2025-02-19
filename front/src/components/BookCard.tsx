import type { Book as BookType } from '../types';
import { Link } from "react-router-dom";

interface BookCardProps {
  book: BookType;
  onAddToRead?: () => void;
  onAddToReadLater?: () => void;
}

export default function BookCard({ book}: BookCardProps) {

  return (
    
    <Link to={`/books/${book.id}`} className="block">
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

// import React, { useState } from 'react';
// import { Plus, Minus } from 'lucide-react';
// import { Book } from "../types";

// interface BookCardProps {
//   book: Book;
// }

// const BookCard: React.FC<BookCardProps> = ({ book }) => {
//   // Optionnel: vous pouvez gérer ici l'état si le livre est dans la bibliothèque
//   const handleAdd = () => {
//     // Ici, vous pouvez ajouter la logique pour ajouter le livre à la bibliothèque
//   };

//   const handleRemove = () => {
//     // Ici, la logique pour retirer le livre de la bibliothèque
//   };

//   return (
//     <div className="max-w-xs mx-auto border rounded-lg shadow p-4 bg-white">
//       {/* Image de couverture */}
//       <img
//         src={book.image}
//         alt={`Cover of ${book.title}`}
//         className="w-full h-48 object-cover rounded"
//       />
//       {/* Détails du livre */}
//       <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
//       <p className="text-sm text-gray-600">
//         {book.Author.firstname} {book.Author.lastname}
//       </p>
//       <p className="text-sm text-gray-500">
//         {new Date(book.published_date).toLocaleDateString('fr-FR')}
//       </p>
//       {/* Zone d'actions avec les boutons + et - */}
//       <div className="flex justify-between items-center mt-4">
//         {/* Bouton Ajouter */}
//         <div className="group relative">
//           <button
//             onClick={handleAdd}
//             className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600"
//           >
//             <Plus size={16} />
//           </button>
//           <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 hidden group-hover:block text-xs text-gray-700 bg-gray-200 px-2 py-1 rounded">
//             Ajouter à votre bibliothèque
//           </span>
//         </div>
//         {/* Bouton Enlever */}
//         <div className="group relative">
//           <button
//             onClick={handleRemove}
//             className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600"
//           >
//             <Minus size={16} />
//           </button>
//           <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 hidden group-hover:block text-xs text-gray-700 bg-gray-200 px-2 py-1 rounded">
//             Enlever de votre bibliothèque
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCard;
