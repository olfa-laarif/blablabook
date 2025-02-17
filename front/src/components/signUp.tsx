import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

    // Fonction de soumission du formulaire
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Empêcher le rechargement de la page
    event.preventDefault(); 
    if (password !== confirmPassword) {
      setPasswordError('Les deux mots de passe sont différents');
      return;
    }
    setPasswordError('');
    // récupérer le contenu des champs
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    console.log(data);
    
    
    };
    
  return (
    <div className="flex items-center justify-center py-8 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md mt-30">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Créer un compte
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">
              Nom
            </label>
            <input
              type="text" 
              id="lastname"
              name="lastname"
              className="w-full px-4 py-1 mt-1 border border-gray-300  rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre nom"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">
              Prenom
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre prenom"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pseudo" className="block text-sm font-medium text-gray-600">
              Pseudo
            </label>
            <input
              type="text"
              id="pseudo"
              name="pseudo"
              className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre pseudo"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input id="email" 
              name="email"
              type="email"
              className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mot de passe</label>
            <div className="relative">
               {/* Ce champ d'entrée bascule entre un type 'password' et 'text' en fonction de l'état de `passwordVisible`. */}
              <input type={passwordVisible ? "text" : "password"} 
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Votre mot de passe" 
              required
              minLength={8}/>
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirmer votre mot de passe</label>
            <div className="relative">
              <input type={confirmPasswordVisible ? "text" : "password"} 
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (passwordError) setPasswordError('');
              }}
              className={`w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Confirmez votre mot de passe ${
                passwordError ? 'border-red-500' : ''
              }`}
              required
              minLength={8} 
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600 "
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
          </div>
          <button type="submit" className="w-full px-4 py-1 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600">
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