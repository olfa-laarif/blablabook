import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Book } from '../types';
import BookCard from './BookCard';
import { useMediaQuery } from 'react-responsive'; // Permet de détecter la taille de l'écran

interface BookCarouselProps {
  books: Book[];
}

export default function BookCarousel({ books }: BookCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Détection de la taille d'écran avec `useMediaQuery`
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const booksPerSlide = isMobile ? 1 : isTablet ? 2 : 3; // 1 livre sur mobile, 2 sur tablette, 3 sur grand écran

  const totalSlides = Math.ceil(books.length / booksPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + booksPerSlide) % books.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - booksPerSlide < 0 ? books.length - (books.length % booksPerSlide || booksPerSlide) : prevIndex - booksPerSlide
    );
  };

  const getCurrentSlideBooks = () => books.slice(currentIndex, currentIndex + booksPerSlide);

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="overflow-hidden relative px-12">
        {/* Responsive grid : 1 colonne sur mobile, 2 sur tablette, 3 sur grand écran */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentSlideBooks().map((book, index) => (
            <div key={`${book.id}-${index}`} className="transform transition-transform duration-500">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-colors z-10"
        aria-label="Previous books"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-colors z-10"
        aria-label="Next books"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * booksPerSlide)}
            className={`w-2 h-2 rounded-full transition-colors ${
              Math.floor(currentIndex / booksPerSlide) === index ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
