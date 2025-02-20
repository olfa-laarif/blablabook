import {User,Book} from "../models/associations.js";
import { sequelize } from "../models/sequelizeClient.js";

export const userController ={

// Récupérer un utilisateur par son email
async getUserByEmail(req, res) {
try {
      const email = req.params.email; // ou req.query.email si c'est un paramètre GET
      // Vérifier si l'email est fourni
    if (!email) {
        return res.status(400).json({ error: "L'email est requis." });
    }
      // Rechercher l'utilisateur par email
    const user = await User.findOne({ 
        where: { email },
        attributes: ['username', 'email']
    });
      // Vérifier si l'utilisateur existe
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
    }
    return res.status(200).json(user);
} catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return res.status(500).json({ error: "Erreur interne du serveur.", details: error.message });
}
},

// Vérifier si un email existe déjà dans la base de données
async emailAlreadyExist(req, res) {
try {
      const email = req.params.email; // ou req.query.email si tu utilises une requête GET
      // Vérifier si l'email est bien fourni
    if (!email) {
        return res.status(400).json({ error: "L'email est requis." });
    }
    // Vérifier si l'utilisateur existe avec cet email
    const user = await User.findOne({ where: { email } });
    return res.status(200).json({ exists: !!user });  
} catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error);
    return res.status(500).json({ error: "Erreur interne du serveur.", details: error.message });
}
},

// Récupérer un utilisateur par son pseudo
async getUserByUsername(req, res) {
  try {
      const username = req.params.username;
      // Vérifier si le pseudo est fourni
      if (!username) {
          return res.status(400).json({ error: "Le pseudo est requis." });
      }
      // Rechercher l'utilisateur par pseudo
      const user = await User.findOne({ 
          where: { username },
          attributes: ['username', 'email']
      });
      // Vérifier si l'utilisateur existe
      if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
      return res.status(200).json(user);
  } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      return res.status(500).json({ error: "Erreur interne du serveur.", details: error.message });
  }
},

// Vérifier si un pseudo est déjà en base de données
async userNameAlreadyExist(req, res) {
  try {
      const username = req.params.username; 
      // Vérifier si le pseudo est bien fourni
      if (!username) {
          return res.status(400).json({ error: "Le pseudo est requis." });
      }
      // Vérifier si l'utilisateur existe avec ce pseudo
      const user = await User.findOne({ where: { username } });
      return res.status(200).json({ exists: !!user });  
  } catch (error) {
      console.error("Erreur lors de la vérification du pseudo :", error);
      return res.status(500).json({ error: "Erreur interne du serveur.", details: error.message });
  }
},

 // Récupérer un utilisateur et tous les livres de sa bibliothèque
async getOneUserWithLibrary(req, res) {
  try {
      const user = await User.findByPk(req.params.user_id, { 
          attributes: ['id', 'firstname', 'lastname', 'username', 'biography', 'email'],
          include: [
              { 
                  model: Book,
                  attributes: ['id', 'title', 'summary', 'published_date', 'image', 'status', 'availability']
              }
          ]
      });
      // Vérifier si l'utilisateur existe
      if (!user) {
          return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }
      return res.status(200).json(user);
  } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      return res.status(500).json({ message: "Erreur interne du serveur." });
  }
},

 // Récupérer tous les utilisateurs et leurs livres associés
async getAllUsers(req, res) {
  try {
      const users = await User.findAll({
          include: [
              { model: Book } // Inclure les livres associés à chaque utilisateur
          ]
      });
      return res.status(200).json(users);
  } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      return res.status(500).json({ message: "Erreur interne du serveur." });
  }
},

// Ajouter un livre à la bibliothèque de l'utilisateur
async addBookToLibrary(req, res) {
try {
    const {  user_id ,book_id} = req.params;
      // Vérifier si le livre existe
    const book = await Book.findByPk(book_id);
    if (!book) {
        return res.status(404).json({ message: "Livre non trouvé." });
    }
      // Vérifier si l'utilisateur existe
    const user = await User.findByPk(user_id, {
          include: Book, // Inclure les livres de l'utilisateur
    });
    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
      // Vérifier si le livre est déjà présent dans la bibliothèque de l'utilisateur
    const alreadyHasBook = await user.hasBook(book);
    if (alreadyHasBook) {
        return res.status(400).json({ message: "Ce livre est déjà dans votre bibliothèque." });
    }
    // Ajouter le livre à la bibliothèque de l'utilisateur
    await user.addBook(book_id);
    await user.reload({ include: Book });
    return res.status(201).json({ message: "Livre ajouté à votre bibliothèque avec succès." });
} catch (error) {
    console.error("Erreur lors de l'ajout du livre :", error);
    return res.status(500).json({ message: "Erreur interne du serveur." });
}
},

//Supprimer un livre de la bibliothèque de l'utilisateur
async removeBookFromLibrary(req, res) {
  try {
      const {  user_id, book_id } = req.params;
      // Rechercher l'utilisateur
      const user = await User.findByPk(user_id, {
          include: Book, 
      });
      // Vérifier si l'utilisateur existe
      if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      // Vérifier si le livre existe
      const book = await Book.findByPk(book_id);
      if (!book) {
          return res.status(404).json({ message: "Livre non trouvé." });
      }
      // Vérifier si le livre fait partie de la bibliothèque de l'utilisateur
      const hasBook = await user.hasBook(book);
      if (!hasBook) {
          return res.status(404).json({ message: "Ce livre n'est pas dans votre bibliothèque." });
      }
      // Retirer le livre de la bibliothèque de l'utilisateur 
      await user.removeBook(book_id);
      await user.reload({ include: Book });
      return res.status(200).json({ message: "Livre retiré de votre bibliothèque avec succès." });
  } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
      return res.status(500).json({ message: "Erreur interne du serveur." });
  }
}



}
