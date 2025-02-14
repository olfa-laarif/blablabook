import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedBook from '../components/FeaturedBook';
import Features from '../components/Features';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { getRandomBooks } from '../services/api';
import { Book } from "../types";
import { filterBooks } from '../utils/filterBooks';


const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchOption, setSearchOption] = useState<string>("title"); // Critère par défaut : Titre
  
  useEffect(() => {
    // Chargement des livres dès le chargement de la page
    const fetchBooks = async () => {
      try {
        const data = await getRandomBooks();
        setBooks(data);
      } catch (error) {
        console.error('Impossible de charger les livres:', error);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = filterBooks(books, searchQuery, searchOption);
  //console.log("filtered books", filteredBooks);
return (
    <>
        <div className="min-h-screen bg-gray-50">
        <Header />
        <Hero />
        <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        searchOption={searchOption} 
        setSearchOption={setSearchOption}
        />
        <FeaturedBook books={filteredBooks}/>
        <Features />
        <Footer />
        </div>
    </>
);
}

export default HomePage;