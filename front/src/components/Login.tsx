import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md ">
        <h2 className="text-2xl font-bold text-center text-gray-700">Se connecter</h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" className="w-full px-4 py-1 mt-1 border border-gray-300 border border-gray-300-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Votre email" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Mot de passe</label>
            {/* Ce div est utilisé pour positionner l'icône de visibilité du mot de passe en mode absolu à l'intérieur du champ de saisie. */}
            <div className="relative">
              {/* Ce champ d'entrée bascule entre un type 'password' et 'text' en fonction de l'état de `passwordVisible`. */}
              <input type={passwordVisible ? "text" : "password"} className="w-full px-4 py-1 mt-1 border border-gray-300 border border-gray-300-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Votre mot de passe" />
              {/* Ce bouton permet d'afficher ou masquer le mot de passe en modifiant l'état `passwordVisible` lorsqu'on clique dessus. */}
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {/* Cette expression conditionnelle affiche l'icône d'œil ouvert ou fermé en fonction de `passwordVisible`. */}
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button className="w-full px-4 py-1 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600">Se connecter</button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Pas encore de compte ? <a href="/signup" className="text-indigo-500 hover:underline">S'inscrire</a>
        </p>
      </div>
    </div>
  );
}
