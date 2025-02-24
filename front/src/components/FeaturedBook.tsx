import { Book } from "../types";
import BookCarousel from "./BookCarousel";

interface BooksProps {
books: Book[];
}

export default function FeaturedBook(props:BooksProps){
return(
      <>
        {/* Featured Books Section */}
            <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  Un échantillon de livres
            </h2>
            <BookCarousel books={props.books} />
            </div>
            </section>
      </>

);
}

