import { BookOpen, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/api";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuth(); // Récupérer l'utilisateur connecté et la fonction de déconnexion
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const runLogoutUser = async () => {
    await logoutUser();
    logout();
    navigate("/"); // Redirige vers la page de tous les livres
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Blablabook */}
          <Link to="/" className="flex items-center">
            <BookOpen className="sm:h-8 sm:w-8 h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">Blablabook</span>
          </Link>

          {/* Navigation pour grand écran */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-800 font-medium">Bienvenue, {user.username}</span>
                <button
                  onClick={runLogoutUser}
                  className="px-4 py-2 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <button className="px-4 py-2 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600">
                    Se connecter
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600">
                    S'inscrire
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Burger Menu visible uniquement sur mobile */}
          <div className="relative sm:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-indigo-600">
              <Menu className="h-6 w-6" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg flex flex-col">
                {user ? (
                  <>
                    <span className="px-4 py-2 text-gray-800 font-medium">Bienvenue, {user.username}</span>
                    <button
                      onClick={runLogoutUser}
                      className="px-4 py-2 text-left font-bold text-gray-900 hover:bg-gray-200"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-4 py-2 hover:bg-gray-200">Se connecter</Link>
                    <Link to="/signup" className="px-4 py-2 hover:bg-gray-200">S'inscrire</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
