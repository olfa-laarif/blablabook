import { Router } from "express";
import helmet from 'helmet';
import { bookController } from "./controllers/book.controller.js";
import { controllerWrapper } from "./middlewares/controller.wrapper.js";
 

export const router = new Router();

//utilisation du middleware helmet pour scuriser l'application
router.use(helmet());

// Route des livres aléatoires
router.get('/api/books/random',controllerWrapper(bookController.getRandomBooks));

// Route pour tout les livres
router.get('/api/books',controllerWrapper(bookController.getAllBooks));

//Route pour un seul livre
router.get('/api/books/:id(\\d+)',controllerWrapper(bookController.getOneBook));
//contrainte de validation
router.use((req, res) => {
    res.status(404).json({error: 'Not found'});
});



