import { useState } from "react";
import { forgotPassword } from "../services/api";


export default function ForgotPassword() {
  
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);

try {
      const userData = await forgotPassword(data.email as string );
      if(userData){
      setMessage(userData.message);
      }
     
    } catch (err) {
        setError(`${err}`);
    

    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-700">Mot de passe oublié</h2>
        <p className="text-sm text-center text-gray-500 mt-2">
          Entrez votre adresse email et nous vous enverrons un lien de réinitialisation.
        </p>

        {message && <p className="text-green-600 text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre adresse email"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
          >
            Envoyer le lien
          </button>
        </form>
      </div>
    </div>
  );
}
