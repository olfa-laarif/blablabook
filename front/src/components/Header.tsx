import { BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/api";

export default function Header() {

  const { user, logout } = useAuth(); // Récupérer l'utilisateur connecté et la fonction de déconnexion
  const navigate = useNavigate();
        
  const runLogoutUser = async () => {
    await logoutUser();
    logout();
    navigate("/all-books");    // Redirige vers la page de tous les livres
  }

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Blablabook */}
          <Link to="/" className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Blablabook</span>
          </Link>
          {/* Navigation */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Affiche le pseudo de l'utilisateur */}
                <span className="text-gray-800 font-medium">Bienvenue, {user.username}</span>
                {/* Bouton de déconnexion */}
                <button
                  onClick={runLogoutUser}
                  className="px-4 py-2 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600"
                  aria-label="Déconnexion"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="flex space-x-4">
                {/* Liens vers Login et Signup si non connecté */}
                <Link to="/login" >
                  <button className="w-full min-w-[140px] px-4 py-2 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600 whitespace-nowrap"
                  aria-label="Se connecter">
                  Se connecter
                  </button>
                </Link>
                <Link to="/signup" >
                  <button className="w-full px-4 py-2 min-w-[140px] font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600 whitespace-nowrap"
                  aria-label="S'inscrire">
                    S'inscrire
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
