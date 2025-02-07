// import React from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
// import { useState } from 'react';



function Header() {

  //const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
<>
  <header className="bg-white shadow-sm fixed top-0 left-0 right-0 w-full z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      
      {/* Logo & Titre */}
      <div className="flex items-center space-x-2">
        <BookOpen className="h-8 w-8 text-indigo-600" />
        <span className="text-xl font-bold text-gray-900">Blablabook</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Se connecter
        </button>
      </nav>


      
    </div>


  </header>
</>

  )
}

export default Header



