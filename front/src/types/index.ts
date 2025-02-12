export interface Book {
    id: string;
    title: string;
    Author: {firstname:string,
      lastname:string
    };
    category: string;
    published_date: string;
    image: string;
    summary: string;
    status:string;
    availability : string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    readBooks: string[];
    toReadBooks: string[];
  }