import { Link } from "react-router";
import { Book, User } from "lucide-react";
import {  useLocation } from 'react-router-dom';

export default function LinksUser() {
  const location = useLocation();

  return (
    <div className="flex items-center gap-4 mb-8">
      
    {location.pathname !== "/library" && <Link 
        to="/library"
        className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
        <Book className="w-5 h-5" />
        <span>Ma Bibliothèque</span>
    </Link>}
    {location.pathname !== "/profil" && <Link 
        to="/profil"
        className="flex items-center gap-2 text-gray-600  ml-auto hover:text-purple-600">
        <User className="w-5 h-5" />
        <span>Mon Profil</span>
    </Link>}
    </div>
  );
}