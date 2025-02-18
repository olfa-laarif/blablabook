import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from '../services/api';

export default function SignUp() {
  // États pour afficher/masquer les mots de passe
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // États pour le mot de passe et sa confirmation (champs contrôlés)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

    // Fonction de soumission du formulaire
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    // Empêcher le rechargement de la page
    event.preventDefault(); 
    if (password !== confirmPassword) {
      setPasswordError('Les deux mots de passe sont différents');
      return;
    }

     // Expression régulière pour vérifier le format du mot de passe
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    // Vérifier le format du mot de passe
    if (!passwordRegex.test(password)) {
    setPasswordError(
    "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et être d'au moins 8 caractères."
  );
  return;
}
    
    setPasswordError('');
    // récupérer le contenu des champs
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const responseData = await registerUser(data.lastname as string, data.firstname as string, data.username as string, data.email as string, data.password as string);
      console.log(responseData);
    } catch {
      setError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    }
    };

  return (
    <div className="flex items-center justify-center py-8 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md mt-30">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Créer un compte
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Champ Nom */}
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">
              Nom
            </label>
            <input
              type="text" 
              id="lastname"
              name="lastname"
              className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre nom"
              required
            />
          </div>
          {/* Champ Prénom */}
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">
              Prénom
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre prénom"
              required
            />
          </div>
          {/* Champ username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Pseudo
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre username"
              required
            />
          </div>
          {/* Champ Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input 
              id="email" 
              name="email"
              type="email"
              className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre email"
              required
            />
          </div>
          {/* Champ Mot de passe */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"} 
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
                placeholder="Votre mot de passe" 
                required
                minLength={8}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {/* Champ Confirmation du mot de passe */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirmer votre mot de passe
            </label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"} 
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (passwordError) setPasswordError('');
                }}
                className={`w-full px-4 py-1 mt-1 border rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Confirmez votre mot de passe"
                required
                minLength={8}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          {/* Bouton de soumission */}
          <button type="submit" className="w-full px-4 py-1 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600">
            S'inscrire
          </button>
        </form>
        {/* Messages d'erreur ou de succès */}
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
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
