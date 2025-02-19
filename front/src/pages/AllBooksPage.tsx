import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BookList from '../components/BookList';
import Features from '../components/Features';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { getAllBooks } from '../services/api';
import { Book } from "../types";

const AllBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchOption, setSearchOption] = useState<string>("title"); // Critère par défaut : Titre
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 6;


  useEffect(() => {
    // Chargement des livres dès le montage de la page
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        console.log("Livres récupérés :", data);
        setBooks(data);
      } catch (error) {
        console.error('Impossible de charger les livres:', error);
      }
    };
    fetchBooks();
  }, []);

  // Calcul de la pagination
  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const paginatedBooks = books.slice(startIndex, endIndex);

  // Gestion des boutons "Précédent" et "Suivant"
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero isBooksPage={true} />
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        searchOption={searchOption} 
        setSearchOption={setSearchOption}
      />
      {/* Affichage de la liste paginée des livres */}
      <div className="mt-10"></div>
      <BookList books={paginatedBooks} />
      {/* Contrôles de pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="text-gray-700">
          Page {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default AllBooksPage;
