import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedBook from '../components/FeaturedBook';
import Features from '../components/Features';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { getAllBooks } from '../services/api';
import { Book } from "../types";


const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    // Chargement des livres dès le chargement de la page
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

return (
    <>
        <div className="min-h-screen bg-gray-50">
        <Header />
        <Hero />
        <SearchBar />
        <FeaturedBook books={books}/>
        

        <Features />



        <Footer />
        
          {/* <Sidebar /> */}
        </div>
    </>
);
}

export default HomePage;