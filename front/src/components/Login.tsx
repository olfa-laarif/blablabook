import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
//import { checkCredentials } from '../services/api';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
    // stockage du message à afficher quand on a eu la réponse du serveur
    //const [message, setMessage] = useState('');

    // stockage du JWT quand l'utilisateur est authentifié
    //const [jwt, setJwt] = useState('');
  
  // Fonction de soumission du formulaire
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Empêcher le rechargement de la page
  // récupérer le contenu des champs
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData);
  if(data){
    console.log('Form submitted');
    console.log(data);
    console.log("Email:", data.email, "Password:", data.password);
  }
  /* exemple pour data :
  {email: 'toto@mail.com', password: '123156'}
  */
  // envoyer les infos à l'API
  //const userData=checkCredentials(data.email as string, data.password as string);
  //setJwt(userData.token);

  // les identifiants étaient bons, on a notamment "pseudo" dans les données
  //console.log(userData);
  //setMessage(`Bienvenue ${userData.pseudo}`);
  //console.log(message);

  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-700">Se connecter</h2>
        <form  onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input id="email" name="email"
                type="email" 
                required
                className="w-full px-4 py-1 mt-1 border border-gray-300 border border-gray-300-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Votre email" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mot de passe</label>
            {/* Ce div est utilisé pour positionner l'icône de visibilité du mot de passe en mode absolu à l'intérieur du champ de saisie. */}
            <div className="relative">
              {/* Ce champ d'entrée bascule entre un type 'password' et 'text' en fonction de l'état de `passwordVisible`. */}
              <input type={passwordVisible ? "text" : "password"} 
                id="password"
                name="password"
                required
                className="w-full px-4 py-1 mt-1 border border-gray-300 border border-gray-300-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Votre mot de passe" />
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
          <button type="submit"   className="w-full px-4 py-1 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600">Se connecter</button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Pas encore de compte ? <a href="/signup" className="text-indigo-500 hover:underline">S'inscrire</a>
        </p>
      </div>
    </div>
  );
}
