import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedBook from '../components/FeaturedBook';
import Features from '../components/Features';
import Footer from '../components/Footer';
import ConnectedUserSearchBar from '../components/ConnectedUserSearchBar';
import { getAllBooks } from '../services/api';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';
import { Book } from "../types";
import { filterBooks } from '../utils/filterBooks';

const ConnectedUserHomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchOption, setSearchOption] = useState<string>("title");

  // Utilisation du hook `useDebouncedSearch`
  const { query, setQuery, debouncedQuery } = useDebouncedSearch("", 1000);

  useEffect(() => {
    // Chargement des livres dès le montage du composant
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      {/* Barre de recherche avec filtrage optimisé */}
      <ConnectedUserSearchBar 
        searchQuery={query}
        setSearchQuery={setQuery}
        searchOption={searchOption}
        setSearchOption={setSearchOption}
      />
      {/* Affichage des livres filtrés */}
      <FeaturedBook books={filteredBooks} />
      <Features />
      <Footer />
    </div>
  );
}

export default ConnectedUserHomePage;





