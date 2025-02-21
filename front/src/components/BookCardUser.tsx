import type { Book} from '../types';
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { addBookToLibrary, removeBookFromLibrary } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface BookCardProps {
  book: Book;
  
}

export const BookCard = ({book}:BookCardProps) => {
   // État pour savoir si le livre est dans la bibliothèque
  const [inLibrary, setInLibrary] = useState(true);

  const { user } = useAuth();
 

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    // Vérifier si le livre n'est pas déjà dans la bibliothèque et si l'utilisateur est défini
    if (!inLibrary && user) {
      const result = await addBookToLibrary(user.id, book.id);
      if (result) {
        setInLibrary(true);
      }
    }
  };

   // Fonction pour retirer le livre de la bibliothèque.
     const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
       e.stopPropagation();
       if (inLibrary && user) {
         
         const result = await removeBookFromLibrary(user.id, book.id); 
         if (result) {
           setInLibrary(false);
         }
       }
     };



  return (
    // Conteneur relatif pour positionner les boutons absolument par rapport à la carte
    <div className="relative group">
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
            {book.Author && <p className="text-gray-600 text-sm mb-2">
              par {book.Author.firstname} {book.Author.lastname}
            </p> }
          </div>
        </div>
      </Link>

      <div className="absolute bottom-2 right-2 flex flex-row space-x-5">
        {inLibrary ? (
          <>
            <button 
              onClick={handleRemove}
              className="w-10 h-10  text-gray  flex items-center justify-center hover:text-indigo-600"
              title="Enlever de votre bibliothèque"
            >
              <Minus size={50} />
            </button>
          </>
        ) : (
          <button 
            onClick={handleAdd}
            className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600"
            title="Ajouter à votre bibliothèque"
          >
            <Plus size={50} />
          </button>
        )}
      </div>
    </div>
  );
}