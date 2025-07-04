export interface Book {
    id: string;
    title: string;
    Author: {
      firstname:string,
      lastname:string,
      biography: string
    };
    Categories: {
    name:string}[];
    published_date: string;
    image: string;
    summary: string;
    availability : string;
    Library: {
        status: string;
    }
    Marks: {
      review: string;
      createdAt:string;
      rating: number;} [];
  }
  
  export interface User {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string; 
    biography:string;
    Books:Book[];
  }

  