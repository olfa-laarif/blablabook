import { Router } from "express";
import { bookController } from "./controllers/book.controller.js";

export const router = new Router();

// Route des livres aléatoires
router.get('/api/books/random',bookController.getRandomBooks);

// Route pour tout les livres
router.get('/api/books', bookController.getAllBooks);

//Route pour un seul livre
router.get('/api/books/:id(\\d+)',bookController.getOneBook);
//contrainte de validation
router.use((req, res) => {
    res.status(404).json({error: 'Not found'});
});
//peut être faire un controllerWrapper!!!


