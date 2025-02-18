import {Book, Author, Category, Mark} from "../models/associations.js";
import { sequelize } from "../models/sequelizeClient.js";



export const bookController ={

//On veut recupéré des livres aléatoires
async  getRandomBooks(req, res){

const randomBooks = await Book.findAll(
{ limit: 6 ,
    order: sequelize.random(),
    include : [
    { model : Author,attributes: ['firstname', 'lastname']}
    ]});
    res.json(randomBooks);
},

//On veut récupérer tout les livres seulement si l'utilateur est connecté
async  getAllBooks(req, res){
const books = await Book.findAll(
{ 
  include : [
  { model : Author,attributes: ['firstname', 'lastname']}
  ]}).catch((error) => {
    console.log(error);
  } );
  res.json(books);
},

async getOneBook(req, res){
  const book = await Book.findByPk(req.params.id, {
    include : [
      {model : Author},
      {model : Category, attributes : ['name']},
      {model : Mark}
    ]
  });


  if(!book){
    res.status(404).json({error:'Book not found !'});
  }
  res.json(book);
}
}
