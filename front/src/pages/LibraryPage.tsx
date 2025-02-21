import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ConnectedUserSearchBar from '../components/ConnectedUserSearchBar';
import BookList from '../components/BookList';
import Features from '../components/Features';
import Footer from '../components/Footer';
import { getAllBooks } from '../services/api';
import { Book } from "../types";

const LibraryPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // activeFilter peut être "all", "read", "toread" ou "favorite"
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    // Chargement des livres dès le montage de la page
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error('Impossible de charger les livres:', error);
      }
    };
    fetchBooks();
  }, []);

  // Appliquer le filtrage en fonction du filtre actif et du search query
  useEffect(() => {
    let filtered = books;
    
    // Filtrage selon le statut ou le favori
    if (activeFilter === "read") {
      filtered = filtered.filter(book => book.status.toLowerCase() === "lu");
    } else if (activeFilter === "toread") {
      filtered = filtered.filter(book => book.status.toLowerCase() === "à lire");
    // } else if (activeFilter === "favorite") {
    //   // On suppose que chaque livre possède une propriété isFavorite (boolean)
    //   filtered = filtered.filter(book => book.isFavorite);
     }
    
    // Filtrage par recherche sur le titre
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredBooks(filtered);
  }, [books, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Ma Bibliothèque</h1>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <ConnectedUserSearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchOption={activeFilter}
            setSearchOption={setActiveFilter}
          />
          {/* Boutons de filtre */}
          <div className="flex mt-4 md:mt-0 space-x-4">
            <button 
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded ${activeFilter === "all" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Tous
            </button>
            <button 
              onClick={() => setActiveFilter("read")}
              className={`px-4 py-2 rounded ${activeFilter === "read" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Lu
            </button>
            <button 
              onClick={() => setActiveFilter("toread")}
              className={`px-4 py-2 rounded ${activeFilter === "toread" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              À lire
            </button>
            <button 
              onClick={() => setActiveFilter("favorite")}
              className={`px-4 py-2 rounded ${activeFilter === "favorite" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Favoris
            </button>
          </div>
        </div>
        <BookList books={filteredBooks} />
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default LibraryPage;
