export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    publishedDate: string;
    coverUrl: string;
    description: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    readBooks: string[];
    toReadBooks: string[];
  }