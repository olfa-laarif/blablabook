import { useEffect, useState, useCallback } from 'react';
import Header from '../components/Header';
import ConnectedUserSearchBar from '../components/ConnectedUserSearchBar';
import BookList from '../components/BookList';
import Footer from '../components/Footer';
import { getUserById } from '../services/api';
import { Book } from "../types";
import { useAuth } from '../context/AuthContext';
import LinksUser from '../components/LinksUser';

const LibraryPage = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Fonction pour récupérer la bibliothèque de l'utilisateur
  const fetchUserLibrary = useCallback(async () => {
    if (user?.id) {
      try {
        const userData = await getUserById(user.id);
        if (userData?.Books) {
          setBooks(userData.Books);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la bibliothèque :", error);
      }
    }
  }, [user?.id]); // Ajout de user.id comme dépendance

  useEffect(() => {
    fetchUserLibrary();
  }, [fetchUserLibrary]);

  // Filtrage des livres en fonction du filtre actif et de la recherche
  useEffect(() => {
    let filtered = books;
    if (activeFilter === "read") {
      filtered = filtered.filter(book => book.status.toLowerCase() === "lu");
    } else if (activeFilter === "toread") {
      filtered = filtered.filter(book => book.status.toLowerCase() === "à lire");
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [activeFilter, searchQuery, books]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <LinksUser />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ma Bibliothèque
          </h2>
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
            </div>
          </div>
          <BookList books={filteredBooks} fetchUserLibrary={fetchUserLibrary} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LibraryPage;
