export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    published_date: string;
    image: string;
    description: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    readBooks: string[];
    toReadBooks: string[];
  }