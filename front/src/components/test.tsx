import type { Book } from "../types";
import { Link } from "react-router-dom";
import { Plus, Minus,Check,X } from "lucide-react";
import { useState } from "react";
import { addBookToLibrary, removeBookFromLibrary } from "../services/api";



interface BookCardProps {
  book: Book;
  libraryPage?: boolean;
  onAddToRead?: () => void;
  onAddToReadLater?: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  libraryPage = false,
  onAddToRead,
  onAddToReadLater,
}) => {
  // Initialisation de l'état selon la prop defaultInLibrary.
  const [inLibrary, setInLibrary] = useState(libraryPage);
  const [isRead, setIsRead] = useState(false);


  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (inLibrary) {
      const result = await addBookToLibrary("user_id_placeholder", book.id);
      if (result) {
        setInLibrary(false);
      }
    }
  };

  

  // Fonction pour retirer le livre de la bibliothèque.
  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (inLibrary) {
      const user_id = "user_id_placeholder"; // Define user_id
      const result = await removeBookFromLibrary(user_id, book.id, "third_argument_placeholder"); // Pass user_id, book.id, and the third argument correctly
      if (result) {
        setInLibrary(false);
      }
    }
  };

  // Fonction pour basculer le statut "lu" / "non lu"
  const toggleRead = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newIsRead = !isRead;
    setIsRead(newIsRead);
    // Si le livre est marqué comme lu, on appelle la fonction onAddToRead
    // Sinon, on appelle onAddToReadLater
    if (newIsRead) {
      if (onAddToRead) onAddToRead();
    } else {
      if (onAddToReadLater) onAddToReadLater();
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
            <p className="text-gray-600 text-sm mb-2">
              par {book.Author?.firstname ?? "Auteur inconnu"} {book.Author?.lastname ?? ""}
            </p>
          </div>
        </div>
      </Link>

      <div className="absolute bottom-2 right-2 flex flex-row space-x-5">
        {inLibrary ? (
          <>
              <button
                onClick={toggleRead}
                className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600"
                title="Marquer comme lu / non lu"
              >
                {isRead ? <Check size={20} /> : <X size={20} />}
              </button>
            <button 
              onClick={handleRemove}
              className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600"
              title="Enlever de votre bibliothèque"
            >
              <Minus size={50} />
            </button>
          </>
        ) : 
            //   Sur les autres pages, on affiche :
            // - Le bouton "+" si le livre n'est pas dans la bibliothèque.
            // - Le bouton "-" si le livre est déjà dans la bibliothèque.
            <>
            {inLibrary ? (
              <button
                onClick={handleRemove}
                className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600"
                title="Retirer de votre bibliothèque"
              >
                <Minus size={20} />
              </button>
            ) : 
              <button
                onClick={handleAdd}
                className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600"
                title="Ajouter à votre bibliothèque"
              >
                <Plus size={20} />
              </button>
            }
          </>
          }
      </div>
    </div>
  );
}
