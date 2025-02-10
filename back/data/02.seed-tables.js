import 'dotenv/config';
import { sequelize } from '../models/sequelizeClient.js';
import { User, Book, Author,Category,Mark } from '../models/associations.js';

console.log("🔄 blablabook seeding started...");

await Author.bulkCreate([
  {
    firstname: "Albert",
    lastname: "Camus",
    biography: "Albert Camus était un écrivain, philosophe et journaliste français, prix Nobel de littérature.",
    Books: [
      {
        title: "L'Étranger",
        summary: "Un roman philosophique qui explore l'absurdité de la condition humaine.",
        published_date: "1942-06-01",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
        status: "lu",
        availability: false
      }
    ]
  },
  {
    firstname: "Antoine",
    lastname: "de Saint-Exupéry",
    biography: "Antoine de Saint-Exupéry était un aviateur et écrivain français, auteur du Petit Prince.",
    Books: [
      {
        title: "Le Petit Prince",
        summary: "Une histoire intemporelle sur l'amour, l'amitié et la vie.",
        published_date: "1943-04-06",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
        status: "à lire",
        availability: false
      }
    ]
  },
  {
    firstname: "Victor",
    lastname: "Hugo",
    biography: "Victor Hugo est l'un des plus grands écrivains français, auteur de Les Misérables et Notre-Dame de Paris.",
    Books: [
      {
        title: "Les Misérables",
        summary: "Une fresque épique sur la lutte pour la justice et la rédemption.",
        published_date: "1862-01-01",
        image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400",
        status: "lu",
        availability: false
      },
      {
        title: "Notre-Dame de Paris",
        summary: "Une histoire tragique se déroulant autour de la cathédrale de Paris.",
        published_date: "1831-03-16",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400",
        status: "à lire",
        availability: false
      }
    ]
  },
  {
    firstname: "Gustave",
    lastname: "Flaubert",
    biography: "Gustave Flaubert était un romancier français célèbre pour son œuvre Madame Bovary.",
    Books: [
      {
        title: "Madame Bovary",
        summary: "L'histoire tragique d'une femme prisonnière de ses rêves et de ses désillusions.",
        published_date: "1857-12-01",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
        status: "en cours",
        availability: false
      }
    ]
  },
  {
    firstname: "Charles",
    lastname: "Baudelaire",
    biography: "Charles Baudelaire était un poète français, célèbre pour son recueil Les Fleurs du Mal.",
    Books: [
      {
        title: "Les Fleurs du Mal",
        summary: "Une collection de poèmes explorant la beauté et la décadence.",
        published_date: "1857-06-01",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
        status: "en cours",
        availability: false
      }
    ]
  }
], { include: Book });

console.log("Les auteurs et leurs livres ont été ajoutés avec succès !");



async function populateCategory() {
    await Category.create({ name: 'Philosophie' });
    await Category.create({ name: 'Littérature jeunesse' });
    await Category.create({ name: 'Science-fiction' });
    await Category.create({ name: 'Roman historique' });
    await Category.create({ name: 'Fantastique' });
    await Category.create({ name: 'Poésie' });

    console.log("Données ajoutées dans la table Category.");
}

populateCategory();

async function addCategoryToBook(bookTitle, categoryName) {
  const book = await Book.findOne({ where: { title: bookTitle } });
  const category = await Category.findOne({ where: { name: categoryName } });

  if (book && category) {
    await book.addCategory(category);
    console.log(`La catégorie "${categoryName}" a été associée au livre "${bookTitle}".`);
  } else {
    if (!book) console.log(`Le livre "${bookTitle}" n'a pas été trouvé.`);
    if (!category) console.log(`La catégorie "${categoryName}" n'a pas été trouvée.`);
  }
}

// Exemple d'association de livres à des catégories
await addCategoryToBook("L'Étranger", "Philosophie");
await addCategoryToBook("Le Petit Prince", "Littérature jeunesse");
await addCategoryToBook("Les Misérables", "Roman historique");
await addCategoryToBook("Les Fleurs du Mal", "Poésie");



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