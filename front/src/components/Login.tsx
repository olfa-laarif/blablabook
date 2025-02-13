export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          S'inscrire
        </h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nom
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Votre nom"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Prenom
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Votre prenom"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Pseudo
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Votre pseudo"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Votre email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Mot de passe
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Votre mot de passe"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Confirmer votre mot de passe
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Votre mot de passe"
            />
          </div>
          <button className="w-full px-4 py-2 font-bold text-white bg-[#646cffaa] rounded-lg hover:bg-blue-600">
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Déjà un compte ?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
}
