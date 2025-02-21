
import type { Book} from '../types';
import { Link } from "react-router-dom";
import { Plus, Minus, Check, X,Heart } from "lucide-react";
import { useState } from "react";

interface BookCardProps {
  book: Book;
}

 export const BookCard: React.FC<BookCardProps> = ({ book }) => {
   // État pour savoir si le livre est dans la bibliothèque
  const [inLibrary, setInLibrary] = useState(false);
  // État pour savoir si le livre est marqué comme lu
  const [isRead, setIsRead] = useState(false);
   // État pour gérer l'ajout en favoris
   const [favorite, setFavorite] = useState(false);

  const handleAdd = () => {
    // Logique pour ajouter le livre à la bibliothèque
    setInLibrary(true);
  };

  const handleRemove = () => {
    // Logique pour retirer le livre de la bibliothèque
    setInLibrary(false);
  };
  const toggleRead = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Empêche la navigation si on clique sur le bouton
    setIsRead(!isRead);
    // On pouvez ici ajouter la logique d'appel à l'API pour enregistrer le statut "lu"
  };
  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Empêche le clic de déclencher la navigation du lien parent
    setFavorite(!favorite);
    // Vous pouvez ajouter ici un appel API pour enregistrer le favori
  };


  return (
    // Conteneur relatif pour positionner les boutons absolument par rapport à la carte
    <div className="relative group">

         {/* Bouton cœur toujours présent en haut à droite */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={toggleFavorite}
          className="w-12 h-12 flex items-center justify-center focus:outline-none"
          title="Ajouter aux favoris"
        >
          <Heart size={28} className="text-indigo-500" />
        </button>
      </div>
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
