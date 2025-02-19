import 'dotenv/config';
import { sequelize } from '../models/sequelizeClient.js';
import { User, Book, Author,Category,Mark } from '../models/associations.js';
import booksData from './booksData.js';

console.log("🔄 blablabook seeding started...");

// Création des auteurs et des livres en seule lot (batch/bulk)
async function seedAuthors() {
  try {
    await Author.bulkCreate([
      {
        firstname: "Albert",
        lastname: "Camus",
        biography: "Albert Camus était un écrivain, philosophe et journaliste français, prix Nobel de littérature.",
        // Utilise le tableau de 20 livres issus de booksData pour cet auteur.
        Books: booksData,
      },
      // Vous pouvez ajouter d'autres auteurs ici si nécessaire
    ], { include: [Book] }); // On inclut le modèle Book pour créer les enregistrements associés

    console.log("Les auteurs et leurs livres ont été ajoutés avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du seed des auteurs et livres :", error);
    process.exit(1);
  }
}

seedAuthors();
// await Author.bulkCreate([
//   {
//     firstname: "Albert",
//     lastname: "Camus",
//     biography: "Albert Camus était un écrivain, philosophe et journaliste français, prix Nobel de littérature.",
//     Books: [
//       {
//         title: "L'Étranger",
//         summary: "Un roman philosophique qui explore l'absurdité de la condition humaine.",
//         published_date: "1942-06-01",
//         image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
//         status: "lu",
//         availability: false
//       }
//     ]
//   },
//   {
//     firstname: "Antoine",
//     lastname: "de Saint-Exupéry",
//     biography: "Antoine de Saint-Exupéry était un aviateur et écrivain français, auteur du Petit Prince.",
//     Books: [
//       {
//         title: "Le Petit Prince",
//         summary: "Une histoire intemporelle sur l'amour, l'amitié et la vie.",
//         published_date: "1943-04-06",
//         image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
//         status: "à lire",
//         availability: false
//       }
//     ]
//   },
//   {
//     firstname: "Victor",
//     lastname: "Hugo",
//     biography: "Victor Hugo est l'un des plus grands écrivains français, auteur de Les Misérables et Notre-Dame de Paris.",
//     Books: [
//       {
//         title: "Les Misérables",
//         summary: "Une fresque épique sur la lutte pour la justice et la rédemption.",
//         published_date: "1862-01-01",
//         image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400",
//         status: "lu",
//         availability: false
//       },
//       {
//         title: "Notre-Dame de Paris",
//         summary: "Une histoire tragique se déroulant autour de la cathédrale de Paris.",
//         published_date: "1831-03-16",
//         image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400",
//         status: "à lire",
//         availability: false
//       }
//     ]
//   },
//   {
//     firstname: "Gustave",
//     lastname: "Flaubert",
//     biography: "Gustave Flaubert était un romancier français célèbre pour son œuvre Madame Bovary.",
//     Books: [
//       {
//         title: "Madame Bovary",
//         summary: "L'histoire tragique d'une femme prisonnière de ses rêves et de ses désillusions.",
//         published_date: "1857-12-01",
//         image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
//         status: "en cours",
//         availability: false
//       }
//     ]
//   },
//   {
//     firstname: "Charles",
//     lastname: "Baudelaire",
//     biography: "Charles Baudelaire était un poète français, célèbre pour son recueil Les Fleurs du Mal.",
//     Books: [
//       {
//         title: "Les Fleurs du Mal",
//         summary: "Une collection de poèmes explorant la beauté et la décadence.",
//         published_date: "1857-06-01",
//         image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
//         status: "en cours",
//         availability: false
//       }
//     ]
//   }
// ], { include: Book });

// console.log("Les auteurs et leurs livres ont été ajoutés avec succès !");



async function CreateCategory() {
    await Category.create({ name: 'Philosophie' });
    await Category.create({ name: 'Littérature jeunesse' });
    await Category.create({ name: 'Science-fiction' });
    await Category.create({ name: 'Roman historique' });
    await Category.create({ name: 'Fantastique' });
    await Category.create({ name: 'Poésie' });
    await Category.create({name : 'Roman réaliste'});
    await Category.create({name : 'Roman gothique'});

    console.log("Données ajoutées dans la table Category.");
}

await CreateCategory();


// Fonction asynchrone ui permet d'associer une catégorie à un livre
async function addCategoryToBook(bookTitle, categoryName) {
  //On recherche un livre en BDD en fonction de son titre
  const book = await Book.findOne({ where: { title: bookTitle } });
  //On recherche la catégorie een BDD en fonction de son nom
  const category = await Category.findOne({ where: { name: categoryName } });

  // On vérifie que les 2 entités existent avant d'établir la l'association
  if (book && category) {
    //On ajoute la catégorie du livre  via la relation définie par Sequelize
    await book.addCategory(category);
    console.log(`La catégorie "${categoryName}" a été associée au livre "${bookTitle}".`);
  } else {
    // On affiche un message d'erreur si le livre ou la catégorie n'existe pas.
    if (!book) console.log(`Le livre "${bookTitle}" n'a pas été trouvé.`);
    if (!category) console.log(`La catégorie "${categoryName}" n'a pas été trouvée.`);
  }
}

// Exemple d'association de livres à des catégories
await addCategoryToBook("L'Étranger", "Philosophie");
await addCategoryToBook("Le Petit Prince", "Littérature jeunesse");
await addCategoryToBook("Les Misérables", "Roman historique");
await addCategoryToBook("Les Fleurs du Mal", "Poésie");
await addCategoryToBook("Notre-Dame de Paris","Roman gothique");
await addCategoryToBook("Madame Bovary", "Roman réaliste");

  async function CreateUser() {

      await User.create({ username: 'booklover92', firstname: 'Alice', lastname: 'Dupont', email: 'alice.dupont@example.com', password: 'securepass1', biography: 'Amoureuse des livres depuis toujours.' });
      await User.create({ username: 'readaholic21', firstname: 'Bob', lastname: 'Martin', email: 'bob.martin@example.com', password: 'securepass2', biography: 'Explorateur de mondes littéraires.' });
      await User.create({ username: 'pagewanderer', firstname: 'Charlie', lastname: 'Durand', email: 'charlie.durand@example.com', password: 'securepass3', biography: 'À la recherche du prochain chef-d\'œuvre.' });
      await User.create({ username: 'literarymind', firstname: 'Diana', lastname: 'Blanc', email: 'diana.blanc@example.com', password: 'securepass4', biography: 'Poésie et philosophie sont mes passions.' });
  
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
  

 // association de livres à des utilisateurs
await addBookToUser("booklover92", "L'Étranger");
await addBookToUser("booklover92", "Le Petit Prince");
await addBookToUser("readaholic21", "Les Misérables");
await addBookToUser("readaholic21", "Notre-Dame de Paris");
await addBookToUser("pagewanderer", "Madame Bovary");
await addBookToUser("pagewanderer", "Les Fleurs du Mal");
await addBookToUser("literarymind", "Les Fleurs du Mal");
await addBookToUser("literarymind", "L'Étranger");

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

// 
await addMarkToBook("L'Étranger", "booklover92", 5); // Sans review
await addMarkToBook("Le Petit Prince", "readaholic21", 4, "Une aventure poétique magnifique."); // Avec review
await addMarkToBook("Madame Bovary", "pagewanderer", 3, "Bien écrit mais un peu long.");
await addMarkToBook("Les Fleurs du Mal", "literarymind", 5, "Des poèmes captivants.");

console.log("✅ blablabook seed done with success !");
  
console.log("🧹 Clean up by closing database connexion");
await sequelize.close();

/*
const featuredBooks = [
  {
    title: "L'Étranger",
    summary: "Un roman philosophique qui explore l'absurdité de la condition humaine.",
    published_date: "1942-06-01",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    status: "lu",
    availability: true
  },
  {
    title: "Le Petit Prince",
    summary: "Une histoire intemporelle sur l'amour, l'amitié et la vie.",
    published_date: "1943-04-06",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    status: "à lire",
    availability: true
  },
  {
    title: "Madame Bovary",
    summary: "L'histoire tragique d'une femme prisonnière de ses rêves et de ses désillusions.",
    published_date: "1857-12-01",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
    status: "en cours",
    availability: false
  },
  {
    title: "Les Misérables",
    summary: "Une fresque épique sur la lutte pour la justice et la rédemption.",
    published_date: "1862-01-01",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400",
    status: "lu",
    availability: true
  },
  {
    title: "Notre-Dame de Paris",
    summary: "Une histoire tragique se déroulant autour de la cathédrale de Paris.",
    published_date: "1831-03-16",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400",
    status: "à lire",
    availability: true
  },
  {
    title: "Les Fleurs du Mal",
    summary: "Une collection de poèmes explorant la beauté et la décadence.",
    published_date: "1857-06-01",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    status: "en cours",
    availability: true
  }
];

*/ 

/*
const authors = [
  {
    firstname: "Albert",
    lastname: "Camus",
    biography: "Albert Camus est un écrivain, philosophe et journaliste français, lauréat du prix Nobel de littérature en 1957."
  },
  {
    firstname: "Antoine",
    lastname: "de Saint-Exupéry",
    biography: "Antoine de Saint-Exupéry est un écrivain, poète et aviateur français, célèbre pour son œuvre intemporelle 'Le Petit Prince'."
  },
  {
    firstname: "Gustave",
    lastname: "Flaubert",
    biography: "Gustave Flaubert est un écrivain français du XIXe siècle, considéré comme un maître du réalisme, auteur de 'Madame Bovary'."
  },
  {
    firstname: "Victor",
    lastname: "Hugo",
    biography: "Victor Hugo est un écrivain, poète et homme politique français, auteur emblématique de 'Les Misérables' et 'Notre-Dame de Paris'."
  },
  {
    firstname: "Charles",
    lastname: "Baudelaire",
    biography: "Charles Baudelaire est un poète français célèbre pour sa collection de poèmes 'Les Fleurs du Mal', qui a marqué la littérature moderne."
  }
];
 */

/*
const categories = [
  {
    name: "Philosophie" // Correspond à "L'Étranger"
  },
  {
    name: "Littérature jeunesse" // Correspond à "Le Petit Prince"
  },
  {
    name: "Roman réaliste" // Correspond à "Madame Bovary"
  },
  {
    name: "Roman historique" // Correspond à "Les Misérables"
  },
  {
    name: "Roman gothique" // Correspond à "Notre-Dame de Paris"
  },
  {
    name: "Poésie" // Correspond à "Les Fleurs du Mal"
  }
];

*/ 

/*
const users = [
  {
    username: "booklover92",
    firstname: "Alice",
    lastname: "Martin",
    email: "alice.martin@example.com",
    password: "securePassword123",
    biography: "Passionnée par la littérature classique et les romans philosophiques."
  },
  {
    username: "readaholic21",
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    password: "superSecret456",
    biography: "Amateur de science-fiction et d'histoires captivantes."
  },
  {
    username: "pagewanderer",
    firstname: "Emma",
    lastname: "Dupont",
    email: "emma.dupont@example.com",
    password: "readingForever789",
    biography: "Je voyage dans le temps et l'espace à travers mes lectures."
  },
  {
    username: "literarymind",
    firstname: "Lucas",
    lastname: "Bernard",
    email: "lucas.bernard@example.com",
    password: "classicBooks321",
    biography: "Les chefs-d'œuvre littéraires sont ma véritable passion."
  }
];

*/ 

/*
const marks = [
  {
    rating: 5,
    review: "Un chef-d'œuvre intemporel qui invite à réfléchir sur l'existence.",
    UserId: 1, // Correspond à l'utilisateur booklover92
    BookId: 1  // Correspond à "L'Étranger"
  },
  {
    rating: 4,
    review: "Une magnifique aventure poétique et philosophique.",
    UserId: 2, // Correspond à l'utilisateur readaholic21
    BookId: 2  // Correspond à "Le Petit Prince"
  },
  {
    rating: 3,
    review: "Un roman bien écrit mais un peu long pour moi.",
    UserId: 3, // Correspond à l'utilisateur pagewanderer
    BookId: 4  // Correspond à "Les Misérables"
  },
  {
    rating: 5,
    review: "Des poèmes d'une beauté envoûtante.",
    UserId: 4, // Correspond à l'utilisateur literarymind
    BookId: 6  // Correspond à "Les Fleurs du Mal"
  }
];
*/

/*

const library = [
  {
    UserId: 1, // booklover92
    BookId: 1  // "L'Étranger"
  },
  {
    UserId: 2, // readaholic21
    BookId: 2  // "Le Petit Prince"
  },
  {
    UserId: 3, // pagewanderer
    BookId: 4  // "Les Misérables"
  },
  {
    UserId: 4, // literarymind
    BookId: 6  // "Les Fleurs du Mal"
  }
];

*/ 

/*
const bookHasCategory = [
  {
    BookId: 1, // "L'Étranger"
    CategoryId: 1 // "Philosophie"
  },
  {
    BookId: 2, // "Le Petit Prince"
    CategoryId: 2 // "Littérature jeunesse"
  },
  {
    BookId: 4, // "Les Misérables"
    CategoryId: 4 // "Roman historique"
  },
  {
    BookId: 6, // "Les Fleurs du Mal"
    CategoryId: 6 // "Poésie"
  }
];

 */