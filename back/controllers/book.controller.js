import {Book, Author} from "../models/associations.js";
import { sequelize } from "../models/sequelizeClient.js";



export const bookController ={

//On veut recupéré des livres aléatoires
async  getRandomBooks(req, res){

 const randomBooks = await Book.findAll(
{ limit: 3 ,
    order: sequelize.random(),
    include : [
     { model : Author,attributes: ['firstname', 'lastname']}
     ]});
    res.json(randomBooks);
},

async  getAllBooks(req, res){
 const books = await Book.findAll(
 // { 
//      include : [
//       { model : Author,attributes: ['firstname', 'lastname']}
//       ]
//}
);
     res.json(books);
 }
 
}
