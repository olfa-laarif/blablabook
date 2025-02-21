import type { Book } from '../types';
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { addBookToLibrary, removeBookFromLibrary, checkIfInLibrary } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  const { user } = useAuth();
  const [inLibrary, setInLibrary] = useState<boolean>(false);
  
  useEffect(() => {
    if (user) {
      // Fonction pour vérifier si le livre est dans la bibliothèque
      checkIfInLibrary(user.id, book.id).then(setInLibrary).catch(console.error);
    }
  }, [user, book.id]); 
  

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!inLibrary && user) {
      try {
        const result = await addBookToLibrary(user.id, book.id);
        if (result) setInLibrary(true);
      } catch (error) {
        console.error("Erreur lors de l'ajout du livre :", error);
      }
    }
  };

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (inLibrary && user) {
      try {
        const result = await removeBookFromLibrary(user.id, book.id);
        if (result) setInLibrary(false);
      } catch (error) {
        console.error("Erreur lors de la suppression du livre :", error);
      }
    }
  };

  return (
    <div className="relative group">
      <Link to={`/books/${book.id}`} className="block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
          <img
            src={book.image}
            alt={`Cover of ${book.title}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 h-12">{book.title}</h3>
            {book.Author?.firstname && book.Author?.lastname && (
              <p className="text-gray-600 text-sm mb-2">
                par {book.Author.firstname} {book.Author.lastname}
              </p>
            )}
          </div>
        </div>
      </Link>

      <div className="absolute bottom-2 right-2 flex flex-row space-x-5">
        {inLibrary ? (
          <button 
            onClick={handleRemove}
            className="w-10 h-10 text-gray-500 flex items-center justify-center hover:text-indigo-600"
            title="Enlever de votre bibliothèque"
          >
            <Minus size={24} />
          </button>
        ) : (
          <button 
            onClick={handleAdd}
            className="w-10 h-10 text-gray-500 flex items-center justify-center hover:text-indigo-600"
            title="Ajouter à votre bibliothèque"
          >
            <Plus size={24} />
          </button>
        )}
      </div>
    </div>
  );
};
