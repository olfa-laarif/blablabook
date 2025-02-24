import {Book, Author, Category, Mark} from "../models/associations.js";
import { sequelize } from "../models/sequelizeClient.js";

const RANDOM_LIMIT=30;

export const bookController ={

//On veut recupéré des livres aléatoires
async  getRandomBooks(req, res){

const randomBooks = await Book.findAll(
{ limit: RANDOM_LIMIT ,
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

/**
 * Recherche avancée des livres par titre, auteur ou date de publication
 */
export async function searchBooks(req, res) {
  try {
      const { query, searchOption } = req.query;

      if (!query || !searchOption) {
          return res.status(400).json({ message: "Veuillez fournir un terme de recherche et une option valide." });
      }

      let condition = {};

      switch (searchOption) {
          case "title":
              condition = { title: { [Op.iLike]: `%${query}%` } };
              break;
          case "author":
              condition = {
                  [Op.or]: [
                      { "$Author.firstname$": { [Op.iLike]: `%${query}%` } },
                      { "$Author.lastname$": { [Op.iLike]: `%${query}%` } }
                  ]
              };
              break;
          case "published_date":
              condition = { published_date: { [Op.iLike]: `%${query}%` } };
              break;
          default:
              return res.status(400).json({ message: "Option de recherche non valide." });
      }

      // Exécuter la recherche dans la base de données
      const books = await Book.findAll({
          where: condition,
          include: [{ model: Author, as: "Author" }],
          limit: 10, // Limite les résultats pour éviter une surcharge
      });

      res.status(200).json(books);
  } catch (error) {
      console.error("Erreur lors de la recherche des livres :", error);
      res.status(500).json({ message: "Erreur serveur" });
  }
}