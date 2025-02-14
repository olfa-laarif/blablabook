import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    
  return (
    <div className="flex items-center justify-center py-8 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md mt-30">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Créer un compte
        </h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nom
            </label>
            <input
              type="text" 
              className="w-full px-4 py-1 mt-1 border border-gray-300  rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre nom"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Prenom
            </label>
            <input
              type="text"
              className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre prenom"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Pseudo
            </label>
            <input
              type="text"
              className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre pseudo"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Mot de passe</label>
            <div className="relative">
              <input type={passwordVisible ? "text" : "password"} className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Votre mot de passe" />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Confirmer votre mot de passe</label>
            <div className="relative">
              <input type={confirmPasswordVisible ? "text" : "password"} className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Confirmez votre mot de passe" />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button className="w-full px-4 py-1 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600">
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Déjà un compte ?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}