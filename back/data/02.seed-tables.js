import 'dotenv/config';
import { sequelize } from '../models/sequelizeClient.js';
import { User, Book, Author,Category,Mark } from '../models/associations.js';
import { populateDatabase } from './apiGoogleBooks.js';


console.log("🔄 blablabook seeding started...");

// 📌 Fonction pour insérer les livres et leurs auteurs dans la base de données
await populateDatabase();

  async function CreateUser() {

      await User.create({ username: 'booklover92', firstname: 'Alice', lastname: 'Dupont', email: 'alice.dupont@example.com', password: 'securepass1', biography: 'Amoureuse des livres depuis toujours.' });
      await User.create({ username: 'readaholic21', firstname: 'Bob', lastname: 'Martin', email: 'bob.martin@example.com', password: 'securepass2', biography: 'Explorateur de mondes littéraires.' });
      await User.create({ username: 'pagewanderer', firstname: 'Charlie', lastname: 'Durand', email: 'charlie.durand@example.com', password: 'securepass3', biography: 'À la recherche du prochain chef-d\'œuvre.' });
      await User.create({ username: 'literarymind', firstname: 'Diana', lastname: 'Blanc', email: 'diana.blanc@example.com', password: 'securepass4', biography: 'Poésie et philosophie sont mes passions.' });
      await User.create({ username: 'neofe', firstname: 'noel', lastname: 'Fefeu', email: 'neofe@mail.com', password: 'Aa123456.', biography: 'Developpeur en herbe!!!' });
      console.log("Données ajoutées dans la table User.");
  }
  
  await CreateUser();
  // Fonction asynchrone qui permet d'associer un livre et un utilisateur
  async function addBookToUser(username, bookTitle) {
    //On recherche  l'utilisateur en BDD en fonction de son nom d'utilisateur
    const user = await User.findOne({ where: { username: username } })
    if (!user){ console.log(`L'utilisateur "${username}" n'a pas été trouvé.`);
    return;
  }
      // On recherhe le livre en BDD en fonction de n titre
      const book = await Book.findOne({ where: { title: bookTitle } });
      //On vérifie que l'utilisateur et le livre existent avant d'établir leur association
      if (user && book) {
        //On ajoute le livre à l'utilisateur via la relation définie par Sequelize
        await user.addBook(book);
        console.log(`Le livre "${bookTitle}" a été associé à l'utilisateur "${username}".`);
      } else {
    }
      //On affiche un message d'erreur si l'utilisateur ou le livre n'existe pas .
      
      if (!book) console.log(`Le livre "${bookTitle}" n'a pas été trouvé.`);
    }
  


async function assignBooksToUsers() {
  await addBookToUser("booklover92", "L'Étranger");
  await addBookToUser("booklover92", "Le Petit Prince");
  await addBookToUser("readaholic21", "Les Misérables");
  await addBookToUser("readaholic21", "Notre-Dame de Paris");
  await addBookToUser("pagewanderer", "Madame Bovary");
  await addBookToUser("pagewanderer", "Les Fleurs du Mal");
  await addBookToUser("literarymind", "Les Fleurs du Mal");
  await addBookToUser("literarymind", "L'Étranger");
  await addBookToUser("booklover92", "Vingt Mille Lieues sous les mers");
  await addBookToUser("readaholic21", "Le Comte de Monte-Cristo");
  await addBookToUser("pagewanderer", "Les Trois Mousquetaires");
  await addBookToUser("booklover92", "Le Rouge et le Noir");
  await addBookToUser("readaholic21", "L'Assommoir");
  await addBookToUser("pagewanderer", "Germinal");
  await addBookToUser("literarymind", "Les Liaisons dangereuses");
  await addBookToUser("booklover92", "Le Tour du monde en 80 jours");
  await addBookToUser("readaholic21", "Tartuffe");
  await addBookToUser("pagewanderer", "Le Malade imaginaire");
}

await assignBooksToUsers();
console.log("Les livres ont été associés aux utilisateurs avec succès !");


async function addMarkToBook(bookTitle, username, rating, review) {
 
    const book = await Book.findOne({ where: { title: bookTitle } });
    const user = await User.findOne({ where: { username: username } });

    if (book && user) {
      // Vérification préalable de l'existence de la note
      const existingMark = await Mark.findOne({ where: { UserId: user.id, BookId: book.id } });

      if (existingMark) {
        console.log(`Une note existe déjà pour le livre "${bookTitle}" par l'utilisateur "${username}".`);
        return;
      }

      const markData = {
        rating: rating,
        UserId: user.id,
        BookId: book.id,
      };

      if (review) {
        markData.review = review; // Ajout de la review seulement si elle est définie
      }

      await Mark.create(markData);
      console.log(`La note de ${rating} a été ajoutée pour le livre "${bookTitle}" par l'utilisateur "${username}".`);
    } else {
      if (!book) console.log(`Le livre "${bookTitle}" n'a pas été trouvé.`);
      if (!user) console.log(`L'utilisateur "${username}" n'a pas été trouvé.`);
    }
 
}


async function assignReviewsToBooks() {
  await addMarkToBook("L'Étranger", "booklover92", 5); // Sans review
  await addMarkToBook("Le Petit Prince", "readaholic21", 4, "Une aventure poétique magnifique.");
  await addMarkToBook("Le Petit Prince", "pagewanderer", 5);
  await addMarkToBook("Madame Bovary", "pagewanderer", 3, "Bien écrit mais un peu long.");
  await addMarkToBook("Les Fleurs du Mal", "literarymind", 5, "Des poèmes captivants.");
  await addMarkToBook("Notre-Dame de Paris", "readaholic21", 4, "Une histoire gothique fascinante.");
  await addMarkToBook("Le Comte de Monte-Cristo", "pagewanderer", 5, "Un roman d’aventure épique.");
  await addMarkToBook("Le Rouge et le Noir", "readaholic21", 4, "Un portrait psychologique intense.");
  await addMarkToBook("Germinal", "literarymind", 5, "Un chef-d’œuvre du naturalisme.");
  await addMarkToBook("Tartuffe", "pagewanderer", 4, "Une satire toujours d’actualité.");

}

await assignReviewsToBooks();
console.log("Les avis ont été ajoutés avec succès !");

console.log("✅ blablabook seed done with success !");
  
console.log("🧹 Clean up by closing database connexion");
await sequelize.close();
