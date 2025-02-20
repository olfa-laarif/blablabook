import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

// Interface pour typer les props du composant Hero.
// La prop optionnelle "isBooksPage" permet d'afficher un titre différent selon la page.
interface HeroProps {
  isBooksPage?: boolean;
}

export default function Hero({ isBooksPage }: HeroProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <section className="pt-20 pb-12 md:pt-32 md:pb-20 px-4 text-center">
      <h1 className={`${isBooksPage ? 'text-3xl md:text-4xl' : 'text-4xl md:text-6xl'} font-bold text-gray-900 mb-6`}>
        {isBooksPage ? "Découvrez tous nos livres" : "Votre bibliothèque personnelle, Réinventée"}
      </h1>
      {/* Afficher les boutons de navigation uniquement si l'utilisateur est connecté */}
      {user && (
        <div className="flex justify-center items-center gap-6 mt-4">
          {/* Bouton "Accueil" : Masqué sur la page d'accueil */}
          {location.pathname !== "/" && (
            <button 
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Accueil
            </button>
          )}
          {/* Bouton "Tous nos livres" : Masqué sur la page AllBooksPage */}
          {location.pathname !== "/all-books" && (
            <button 
              onClick={() => navigate("/all-books")}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Tous nos livres
            </button>
          )}
          {/* Bouton "Ma Bibliothèque" */}
          <button 
            onClick={() => navigate("/ma-bibliotheque")}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Ma Bibliothèque
          </button>
          {/* Bouton "Mon Profil" */}
          <button 
            onClick={() => navigate("/mon-profil")}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Mon Profil
          </button>
        </div>
      )}
    </section>
  );
}
