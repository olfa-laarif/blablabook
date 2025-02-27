import express from "express";
import { userController } from "../controllers/user.controller.js";
import { controllerWrapper } from "../middlewares/controller.wrapper.js";

const userRouter = express.Router();

//Route pour récuperer un utilisateur par son email
userRouter.get('/email/:email', controllerWrapper(userController.getUserByEmail));

//Route pour récuperer un utilisateur par son pseudo
userRouter.get('/username/:username', controllerWrapper(userController.getUserByUsername));

// Route pour vérifier si un email existe déjà dans la base de données
userRouter.get('/email/exist/:email', controllerWrapper(userController.emailAlreadyExist));

// Route pour vérifier si un pseudo existe déjà dans la base de données
userRouter.get('/username/exist/:username', controllerWrapper(userController.userNameAlreadyExist));

// Route pour un utilisateur
userRouter.get('/:user_id(\\d+)', controllerWrapper(userController.getOneUserWithLibrary));

// Route pour la liste des utilisateurs et leurs livres  
userRouter.get('/', controllerWrapper(userController.getAllUsers));

// Route pour ajouter un livre à la bibliotheque d'un utilisateur
userRouter.put('/:user_id/books/:book_id',userController.addBookToLibrary);

// Route pour supprimer un livre d'une bibliotheque d'un utilisateur
userRouter.delete('/:user_id/books/:book_id',userController.removeBookFromLibrary);

// Vérifier si un livre est dans la bibliothèque de l'utilisateur
userRouter.get('/:user_id/books/:book_id',userController.checkIfInLibrary);

// Mettre à jour le statut du livre dans la table de liaison "Library" à lu
userRouter.patch('/:user_id/library/:book_id/status/read',userController.setStatusBookRead);

// Mettre à jour le statut du livre dans la table de liaison "Library" à lire
userRouter.patch('/:user_id/library/:book_id/status/toread',userController.setStatusBookToRead);

//Vérifier si le livre est lu
userRouter.get('/:user_id/library/:book_id/status/isread', userController.checkIfBookIsRead);


export { userRouter } 