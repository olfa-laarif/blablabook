import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth(); // Récupérer l'utilisateur connecté et la fonction de déconnexion

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Blablabook */}
          <Link to="/" className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Blablabook</span>
          </Link>

          {/* Navigation : Affichage selon l'état de connexion */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Affiche le pseudo de l'utilisateur */}
                <span className="text-gray-800 font-medium">Bienvenue, {user.username}!</span>
                {/* Bouton de déconnexion */}
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                {/* Liens vers Login et Signup si non connecté */}
                <Link to="/login">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Se connecter
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    S'inscrire
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}





// import { BookOpen } from 'lucide-react';
// import { Link,useLocation } from 'react-router-dom';

// export default function Header() {
//   const location = useLocation(); // Récupérer l'URL actuelle

//   return (
//     <header className="bg-white shadow-sm fixed w-full top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           <Link to="/" className="flex items-center">
//             <BookOpen className="h-8 w-8 text-indigo-600" />
//             <span className="ml-2 text-xl font-bold text-gray-900">Blablabook</span>
//           </Link>
//           {/* Afficher "Se connecter" sur la page d'accueil et /login */}
//           {(location.pathname === "/" || location.pathname === "/login") && (
//               <Link to="/login">
//                 <button className="bg-indigo-600 text-white px-4 py-2 mx-2 rounded-lg hover:bg-indigo-700">
//                   Se connecter
//                 </button>
//               </Link>
//             )} 

//             {/* Afficher "S'inscrire" uniquement sur la page /signup */}
//             {location.pathname === "/signup" && (
//               <Link to="/signup">
//                 <button className="bg-indigo-600 text-white px-4 py-2 mx-2 rounded-lg hover:bg-indigo-700">
//                   S'inscrire
//                 </button>
//               </Link>
//             )}
          
//         </div>
//       </div>
//     </header>
//   );
// }