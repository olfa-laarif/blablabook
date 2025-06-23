import { useState } from "react";
import { resetPassword } from "../services/api";
import { useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    if (password !== confirmPassword) {
      setPasswordError("Les deux mots de passe sont différents.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et être d'au moins 8 caractères."
      );
      return;
    }

    try {
      const response = await resetPassword(token as string,password );
     
    if (response ) {
      setMessage(response);
    } else {
      setError("Une erreur est survenue.");
    }
    } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Une erreur inconnue est survenue.");
    }
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Création d'un nouveau mot de passe
        </h2>

        {message && <p className="text-green-600 text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Mot de passe */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none"
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

          {/* Confirmation */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirmer votre mot de passe
            </label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                className={`w-full px-4 py-2 mt-1 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none`}
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
            {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
          >
            Réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </div>
  );
}
