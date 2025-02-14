import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Blablabook</span>
          </Link>
          <Link to="/login">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Se connecter
            </button>
            </Link>
        </div>
      </div>
    </header>
  );
}