import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    title: string;
    author: string;
  };
  onSubmit: (rating: number, review: string) => void;
}

export default function ReviewModal({ isOpen, onClose, book, onSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, review);
    setRating(0);
    setReview('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Évaluer ce livre</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
          <p className="text-gray-600">par {book.author}</p>
        </div>

        {/* Rating Stars */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Votre note
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Votre avis
            </label>
            <textarea
              id="review"
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Partagez votre expérience de lecture..."
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!rating || !review.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}