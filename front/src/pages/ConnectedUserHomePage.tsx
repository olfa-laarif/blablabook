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





// import { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import Hero from '../components/Hero';
// import FeaturedBook from '../components/FeaturedBook';
// import Features from '../components/Features';
// import Footer from '../components/Footer';
// import ConnectedUserSearchBar from '../components/ConnectedUserSearchBar';
// import { getRandomBooks } from '../services/api';
// import { useDebouncedSearch } from '../hooks/useDebouncedSearch';
// import { Book } from "../types";
// import { filterBooks } from '../utils/filterBooks';

// const ConnectedUserHomePage = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
//   const [searchOption, setSearchOption] = useState<string>("title");

//   // État pour la pagination
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const booksPerPage = 10; // Nombre de livres par page

//   // Utilisation du hook `useDebouncedSearch`
//   const { query, setQuery, debouncedQuery } = useDebouncedSearch("", 1000);

//   useEffect(() => {
//     // Chargement des livres dès le montage du composant
//     const fetchBooks = async () => {
//       try {
//         const data = await getRandomBooks();
//         setBooks(data);
//       } catch (error) {
//         console.error('Impossible de charger les livres:', error);
//       }
//     };
//     fetchBooks();
//   }, []);

//   useEffect(() => {
//     // Filtrage des livres uniquement après la fin de la saisie (debounced)
//     const results = filterBooks(books, debouncedQuery, searchOption);
//     setFilteredBooks(results);
//     setCurrentPage(1); // Réinitialiser à la première page après une recherche
//   }, [books, debouncedQuery, searchOption]);

//   // Pagination : Extraire les livres de la page actuelle
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const paginatedBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <Hero />
      
//       {/* Barre de recherche avec filtrage optimisé */}
//       <ConnectedUserSearchBar 
//         onSearch={(query, option) => {
//           setQuery(query); 
//           setSearchOption(option);
//         }}
//       />

//       {/* Affichage des livres paginés */}
//       <FeaturedBook books={paginatedBooks} />

//       {/* Pagination */}
//       <div className="flex justify-center space-x-4 mt-6">
//         <button 
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
//         >
//           Précédent
//         </button>

//         <span className="px-4 py-2 bg-white border rounded-md">
//           Page {currentPage} / {Math.ceil(filteredBooks.length / booksPerPage)}
//         </span>

//         <button 
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredBooks.length / booksPerPage)))}
//           disabled={currentPage >= Math.ceil(filteredBooks.length / booksPerPage)}
//           className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
//         >
//           Suivant
//         </button>
//       </div>

//       <Features />
//       <Footer />
//     </div>
//   );
// }

// export default ConnectedUserHomePage;