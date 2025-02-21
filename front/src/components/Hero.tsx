import { useNavigate } from 'react-router-dom';

// On définit une interface pour typer les props du composant Hero.
// Ici, la prop optionnelle "isBooksPage" permet de savoir si le Hero est affiché sur la page des livres.
interface HeroProps {
  isBooksPage?: boolean;
}

export default function Hero({ isBooksPage }: HeroProps) {
  const navigate = useNavigate();
  // On affiche un titre différent si isBooksPage est vrai

  return (
    <section className="pt-20 pb-12 md:pt-32 md:pb-20 px-4 text-center">
      <h1 className={`${isBooksPage ? 'text-3xl md:text-4xl' : 'text-4xl md:text-6xl'} font-bold text-gray-900 mb-6`}>
        {isBooksPage ? "Découvrez tous nos livres" : "Votre bibliothèque personnelle, Réinventée"}
      </h1>
      {/* Les boutons ne s'affichent que si isBooksPage est vrai */}
      {isBooksPage && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button 
            onClick={() => navigate("/library")}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Ma Bibliothèque
          </button>
          <button 
            onClick={() => navigate("/profil")}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Mon Profil
          </button>
        </div>
      )}
    </section>
  );
}
