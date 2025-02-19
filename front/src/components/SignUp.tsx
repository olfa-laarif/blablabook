import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from '../services/api';
import { useNavigate } from "react-router-dom";

export default function SignUp() {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

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
    try{
    const registerData=await registerUser(data.lastname as string, data.firstname as string, data.username as string,data.email as string, data.password as string );
    if(registerData){
      navigate("/all-books");
    }
    
    }
    catch(error){
      console.log(error);
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
            <input id="email" name="email" type="email" required autoComplete="email" className="w-full px-4 py-1 mt-1 border rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Votre email" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mot de passe</label>
            <div className="relative">
              <input type={passwordVisible ? "text" : "password"} id="password" name="password" required autoComplete="current-password" className="w-full px-4 py-1 mt-1 border rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" placeholder="Votre mot de passe" />
              <button type="button" className="absolute right-3 top-3 text-gray-600" onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full px-4 py-1 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600">Se connecter</button>
        </form>
      </div>
    </div>
  );
}