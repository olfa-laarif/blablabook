import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { checkCredentials, getConnectedUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth(); // Récupérer la fonction login du contexte
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const userData = await checkCredentials(data.email as string, data.password as string);
      if (userData) {
        const userInfo = await getConnectedUser();
        if (userInfo?.user) {
          login(userInfo.user); // Met à jour le contexte global avec l'utilisateur connecté
          navigate("/all-books"); // Redirige pour le moment vers la page de tous les livres
        }
      }
      else
      {
        setError(`Email ou mot de passe incorrect`); 
      }
    } catch (err) {
      setError(`Email ou mot de passe incorrect.${err}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-700">Se connecter</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input id="email" name="email" type="email" required className="w-full px-4 py-1 mt-1 border rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Votre email" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mot de passe</label>
            <div className="relative">
              <input type={passwordVisible ? "text" : "password"} id="password" name="password" required className="w-full px-4 py-1 mt-1 border rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Votre mot de passe" />
              <button type="button" className="absolute right-3 top-3 text-gray-600" onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full px-4 py-1 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600">Se connecter</button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Pas encore de compte ? <a href="/signup" className="text-indigo-500 hover:underline">S'inscrire</a>
        </p>
      </div>
    </div>
  );
}