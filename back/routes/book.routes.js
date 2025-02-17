import express from "express";
import { Router } from "express";
import helmet from 'helmet';
import { bookController } from "../controllers/book.controller.js";
import { controllerWrapper } from "../middlewares/controller.wrapper.js";

 const bookRouter = express.Router();

//utilisation du middleware helmet pour scuriser l'application
bookRouter.use(helmet());

// Route des livres aléatoires
bookRouter.get('/api/books/random',controllerWrapper(bookController.getRandomBooks));

// Route pour tout les livres
bookRouter.get('/api/books',controllerWrapper(bookController.getAllBooks));

//Route pour un seul livre
bookRouter.get('/api/books/:id(\\d+)',controllerWrapper(bookController.getOneBook));
//contrainte de validation
bookRouter.use((req, res) => {
    res.status(404).json({error: 'Not found'});
});

export { bookRouter } 



