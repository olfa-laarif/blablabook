import React, { useState } from 'react';
import { Book, BookPlus, Star } from 'lucide-react';
import type { Book as BookType } from '../types';
import ReviewModal from './ReviewModal';

interface BookCardProps {
  book: BookType;
  onAddToRead?: () => void;
  onAddToReadLater?: () => void;
}

export default function BookCard({ book, onAddToRead, onAddToReadLater }: BookCardProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleReviewSubmit = (rating: number, review: string) => {
    console.log('Review submitted:', { book: book.title, rating, review });
    // Here you would typically send this data to your backend
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img
          src={book.coverUrl}
          alt={`Cover of ${book.title}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">par {book.author}</p>
          <p className="text-gray-500 text-sm mb-4">{book.genre}</p>
        </div>
      </div>
    </>
  );
}