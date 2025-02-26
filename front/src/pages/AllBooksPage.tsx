import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import BookList from '../components/BookList';
import Footer from '../components/Footer';
import ConnectedUserSearchBar from '../components/ConnectedUserSearchBar';
import { getAllBooks } from '../services/api';
import { Book } from "../types";
import { filterBooks } from '../utils/filterBooks';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';
import LinksUser from '../components/LinksUser';

const BOOKS_PER_PAGE = 9;

const AllBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchOption, setSearchOption] = useState<string>("title"); // Critère par défaut : Titre
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const booksPerPage = BOOKS_PER_PAGE;

  // Utilisation du hook `useDebouncedSearch`
  const { query, setQuery, debouncedQuery } = useDebouncedSearch("", 1000);
  // Pour l'input de page :
  const [customPage, setCustomPage] = useState<string>("");

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

  // Gérer la saisie du numéro de page
  const handleChangePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPage(e.target.value);
  };

  // Aller à la page (après Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const pageNumber = parseInt(customPage, 10);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        setCustomPage(""); // Réinitialiser l'input après validation
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <LinksUser />
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
        <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 mt-4">
          {/* Bouton Précédent */}
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-2 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50 flex items-center"
          >
            <ChevronLeft className="h-5 w-5 sm:hidden" />
            <span className="hidden sm:inline">Précédent</span>
          </button>

          <span className="text-gray-700 text-sm sm:text-base">
            Page {currentPage} de {totalPages}
          </span>

          <input
            type="number"
            className="w-20 sm:w-24 border border-gray-300 rounded py-1 px-2 focus:outline-none focus:border-indigo-500"
            placeholder="N° page"
            value={customPage}
            onChange={handleChangePageInput}
            onKeyDown={handleKeyDown}
            min={1}
            max={totalPages}
          />

          {/* Bouton Suivant */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50 flex items-center"
          >
            <span className="hidden sm:inline">Suivant</span>
            <ChevronRight className="h-5 w-5 sm:hidden" />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllBooksPage;
