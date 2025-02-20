import express from "express";
import { bookController } from "../controllers/book.controller.js";
import { controllerWrapper } from "../middlewares/controller.wrapper.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const bookRouter = express.Router();


// Route des livres aléatoires
bookRouter.get('/random',controllerWrapper(bookController.getRandomBooks));

// Route pour tout les livres
bookRouter.get('/',controllerWrapper(bookController.getAllBooks));

//Route pour un seul livre
bookRouter.get('/:id(\\d+)',controllerWrapper(bookController.getOneBook));

// Route de recherche des livres implémentée côté backend à ajouter en front dans les routes protégées (on enlèvera le authenticate token pour tester)
bookRouter.get("/search", authenticateToken, controllerWrapper(bookController.searchBooks));


export { bookRouter } 



