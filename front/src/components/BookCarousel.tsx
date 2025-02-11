import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Book } from '../types';
import BookCard from './BookCard';

interface BookCarouselProps {
  books: Book[];
}

export default function BookCarousel({ books }: BookCarouselProps) {
  console.log(books);
  const [currentIndex, setCurrentIndex] = useState(0);
  const booksPerSlide = 3;
  const totalSlides = Math.ceil(books.length / booksPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + booksPerSlide;
      return nextIndex >= books.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - booksPerSlide;
      return nextIndex < 0 ? books.length - (books.length % booksPerSlide || booksPerSlide) : nextIndex;
    });
  };

  const getCurrentSlideBooks = () => {
    const visibleBooks = [];
    for (let i = 0; i < booksPerSlide; i++) {
      const bookIndex = (currentIndex + i) % books.length;
      visibleBooks.push(books[bookIndex]);
    }
    return visibleBooks;
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="overflow-hidden relative px-12">
        <div className="grid grid-cols-3 gap-6">
          {getCurrentSlideBooks().filter((book) => book !== undefined && book !== null).map((book) => (
            <div key={book.id} className="transform transition-transform duration-500">
              <BookCard book={book}
                // onAddToRead={() => console.log('Added to read:', book.title)}
                // onAddToReadLater={() => console.log('Added to read later:', book.title)}
              />
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