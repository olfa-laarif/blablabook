import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BookList from '../components/BookList';
import Features from '../components/Features';
import Footer from '../components/Footer';
import ConnectedUserSearchBar from '../components/ConnectedUserSearchBar';
import { getAllBooks } from '../services/api';
import { Book } from "../types";
import { filterBooks } from '../utils/filterBooks';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';


const AllBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchOption, setSearchOption] = useState<string>("title"); // Critère par défaut : Titre
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const booksPerPage = 6;

 // Utilisation du hook `useDebouncedSearch`
  const { query, setQuery, debouncedQuery } = useDebouncedSearch("", 1000);

  useEffect(() => {
    // Chargement des livres dès le montage de la page
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error('Impossible de charger les livres:', error);
      }
    };
    fetchBooks();
  }, []);

   useEffect(() => {
      // Filtrage des livres uniquement après la fin de la saisie (debounced)
      const results = filterBooks(books, debouncedQuery, searchOption);
      setFilteredBooks(results);
    }, [books, debouncedQuery, searchOption]);

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

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
       <ConnectedUserSearchBar 
              searchQuery={query}
              setSearchQuery={setQuery}
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


