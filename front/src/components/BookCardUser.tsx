import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import slugify from 'slugify'; 
import { useState, useEffect } from "react";
import { addBookToLibrary, removeBookFromLibrary, checkIfInLibrary } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Book } from "../types";

interface BookCardProps {
  book: Book;
  fetchUserLibrary?: () => void; // Fonction pour rafraîchir la liste des livres
}

export const BookCard = ({ book, fetchUserLibrary = () => {} }: BookCardProps) => {
  const { user } = useAuth();
  const [inLibrary, setInLibrary] = useState<boolean>(false);
  
  useEffect(() => {
    if (user) {
      checkIfInLibrary(user.id, book.id).then(setInLibrary).catch(console.error);
    }
  }, [user, book.id]); 
  

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!inLibrary && user) {
      try {
        const result = await addBookToLibrary(user.id, book.id);
        if (result) {
          setInLibrary(true);
          fetchUserLibrary(); // 🔄 Mettre à jour la bibliothèque
        }
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
        if (result) {
          setInLibrary(false);
          fetchUserLibrary();  // 🔄 Mettre à jour la bibliothèque après suppression
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du livre :", error);
      }
    }
  };

  const slug = slugify(book.title, { lower: true, strict: true });

  return (
    <div className="relative group">
      <Link to={`/books/${book.id}-${slug}`} className="block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
          <img
            src={book.image}
            alt={`Cover of ${book.title}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 h-14 line-clamp-2 mb-1">{book.title}</h3>
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
