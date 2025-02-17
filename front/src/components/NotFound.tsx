
export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center ">
        <p className="text-base font-semibold text-indigo-600">Erreur 404</p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">Page introuvable</h1>
        <p className="mt-6 text-lg text-gray-600 sm:text-xl">Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
        <div className="mt-10 flex items-center justify-center">
          <a href="/" className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
  