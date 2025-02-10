import { Book } from "../types";
import BookCarousel from "./BookCarousel";



const featuredBooks: Book[] = [
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      genre: 'Fiction',
      publishedDate: '2020-08-13',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
      description: 'Between life and death there is a library...'
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-Help',
      publishedDate: '2018-10-16',
      coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
      description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones'
    },
    {
      id: '3',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      genre: 'Science Fiction',
      publishedDate: '2021-05-04',
      coverUrl: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=800',
      description: 'A lone astronaut must save the earth from disaster'
    },
    {
      id: '4',
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      genre: 'Historical Fiction',
      publishedDate: '2017-06-13',
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
      description: "The truth behind Hollywood's greatest mystery"
    },
    {
      id: '5',
      title: 'Tomorrow, and Tomorrow, and Tomorrow',
      author: 'Gabrielle Zevin',
      genre: 'Literary Fiction',
      publishedDate: '2022-07-05',
      coverUrl: 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&q=80&w=800',
      description: 'A modern tale of love, creativity, and video games'
    },
    {
      id: '6',
      title: 'Lessons in Chemistry',
      author: 'Bonnie Garmus',
      genre: 'Historical Fiction',
      publishedDate: '2022-04-05',
      coverUrl: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?auto=format&fit=crop&q=80&w=800',
      description: 'A chemist turned cooking show host in the 1960s'
    },
    {
      id: '7',
      title: 'The Light We Carry',
      author: 'Michelle Obama',
      genre: 'Memoir',
      publishedDate: '2022-11-15',
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
      description: 'Practical wisdom and powerful strategies for staying hopeful'
    },
    {
      id: '8',
      title: 'Cloud Cuckoo Land',
      author: 'Anthony Doerr',
      genre: 'Literary Fiction',
      publishedDate: '2021-09-28',
      coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800',
      description: 'A masterpiece about children on the cusp of adulthood'
    },
    {
      id: '9',
      title: 'The Paris Apartment',
      author: 'Lucy Foley',
      genre: 'Mystery',
      publishedDate: '2022-02-22',
      coverUrl: 'https://images.unsplash.com/photo-1524230659092-07f99a75c013?auto=format&fit=crop&q=80&w=800',
      description: 'A mystery in the heart of Paris'
    },
    {
      id: '10',
      title: 'Sea of Tranquility',
      author: 'Emily St. John Mandel',
      genre: 'Science Fiction',
      publishedDate: '2022-04-05',
      coverUrl: 'https://images.unsplash.com/photo-1465929639680-64ee080eb3ed?auto=format&fit=crop&q=80&w=800',
      description: 'A novel of art, time travel, and pandemic'
    }
  ];

export default function FeaturedBook(){
    return(
        <>
        {/* Featured Books Section */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Un échantillon de livres
                </h2>
                <BookCarousel books={featuredBooks} />
                </div>
            </section>
        </>

    );
}

