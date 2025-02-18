export interface Book {
    id: string;
    title: string;
    Author: {
      firstname:string,
      lastname:string,
      biography: string
    };
    Category: {
      name:string}[];
    published_date: string;
    image: string;
    summary: string;
    status:string;
    availability : string;
    Marks: {
      review: string;
      createdAt:string;
      rating: number;} [];
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    readBooks: string[];
    toReadBooks: string[];
  }

  export interface UserData {
    id: string; 
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    biography?: string;
  }

  export interface NewUserData {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    biography?: string;
  }
  