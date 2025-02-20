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
  },
  {
    firstname: "Jean-Paul",
    lastname: "Sartre",
    biography: "Jean-Paul Sartre est un philosophe, dramaturge et écrivain français, figure de proue de l'existentialisme.",
    Books: [
      {
        title: "L'Être et le Néant",
        summary: "Un ouvrage philosophique majeur sur l'existentialisme et la liberté humaine.",
        published_date: "1943-01-01",
        image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&q=80&w=400",
        status: "à lire",
        availability: true
      }
    ]
  },
  {
    firstname: "Émile",
    lastname: "Zola",
    biography: "Émile Zola est un écrivain et journaliste français, chef de file du naturalisme, connu pour sa série 'Les Rougon-Macquart'.",
    Books: [
      {
        title: "Germinal",
        summary: "Un roman réaliste décrivant la vie difficile des mineurs du XIXe siècle.",
        published_date: "1885-03-01",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
        status: "en cours",
        availability: false
      }
    ]
  },
  {
    firstname: "Marcel",
    lastname: "Proust",
    biography: "Marcel Proust est un écrivain français, auteur de l'œuvre monumentale 'À la recherche du temps perdu'.",
    Books: [
      {
        title: "Du côté de chez Swann",
        summary: "Le premier volume de 'À la recherche du temps perdu', où le narrateur explore ses souvenirs.",
        published_date: "1913-11-14",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=400",
        status: "à lire",
        availability: true
      }
    ]
  },
  {
    firstname: "Alexandre",
    lastname: "Dumas",
    biography: "Alexandre Dumas est un écrivain français, célèbre pour ses romans historiques comme 'Les Trois Mousquetaires' et 'Le Comte de Monte-Cristo'.",
    Books: [
      {
        title: "Le Comte de Monte-Cristo",
        summary: "Une aventure épique de vengeance et de justice.",
        published_date: "1844-08-28",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
        status: "lu",
        availability: false
      },
      {
        title: "Les Trois Mousquetaires",
        summary: "Un roman de cape et d'épée racontant les aventures de d'Artagnan et ses amis.",
        published_date: "1844-03-14",
        image: "https://images.unsplash.com/photo-1522143049013-2519756a52d4?auto=format&fit=crop&q=80&w=400",
        status: "à lire",
        availability: true
      }
    ]
  },
  {
    firstname: "Stendhal",
    lastname: "",
    biography: "Stendhal, de son vrai nom Henri Beyle, est un écrivain français du XIXe siècle, connu pour 'Le Rouge et le Noir' et 'La Chartreuse de Parme'.",
    Books: [
      {
        title: "Le Rouge et le Noir",
        summary: "L'ascension sociale d'un jeune homme ambitieux dans la société française du XIXe siècle.",
        published_date: "1830-11-01",
        image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400",
        status: "lu",
        availability: false
      }
    ]
  },
  {
    firstname: "Molière",
    lastname: "",
    biography: "Molière, de son vrai nom Jean-Baptiste Poquelin, est un dramaturge et comédien français du XVIIe siècle, maître de la comédie classique.",
    Books: [
      {
        title: "Le Malade Imaginaire",
        summary: "Une comédie satirique sur la médecine et la société.",
        published_date: "1673-02-10",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
        status: "en cours",
        availability: true
      }
    ]
  }
], { include: Book });

console.log("Les auteurs et leurs livres ont été ajoutés avec succès !");



async function CreateCategory() {
  await Category.create({ name: 'Philosophie' });
  await Category.create({ name: 'Littérature jeunesse' });
  await Category.create({ name: 'Science-fiction' });
  await Category.create({ name: 'Roman historique' });
  await Category.create({ name: 'Fantastique' });
  await Category.create({ name: 'Poésie' });
  await Category.create({ name: 'Roman réaliste' });
  await Category.create({ name: 'Roman gothique' });
  await Category.create({ name: 'Roman psychologique' });
  await Category.create({ name: 'Dystopie' });
  await Category.create({ name: 'Aventure' });
  await Category.create({ name: 'Roman épistolaire' });
  await Category.create({ name: 'Théâtre' });
  await Category.create({ name: 'Naturaliste' });

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



async function addCategoriesToBooks() {
  await addCategoryToBook("L'Étranger", "Philosophie");
  await addCategoryToBook("Le Petit Prince", "Littérature jeunesse");
  await addCategoryToBook("Les Misérables", "Roman historique");
  await addCategoryToBook("Les Fleurs du Mal", "Poésie");
  await addCategoryToBook("Notre-Dame de Paris", "Roman gothique");
  await addCategoryToBook("Madame Bovary", "Roman réaliste");
  await addCategoryToBook("Vingt Mille Lieues sous les mers", "Science-fiction");
  await addCategoryToBook("Le Comte de Monte-Cristo", "Roman historique");
  await addCategoryToBook("Les Trois Mousquetaires", "Aventure");
  await addCategoryToBook("À la recherche du temps perdu", "Roman psychologique");
  await addCategoryToBook("Le Rouge et le Noir", "Roman psychologique");
  await addCategoryToBook("L'Assommoir", "Dystopie");
  await addCategoryToBook("Germinal", "Roman réaliste");
  await addCategoryToBook("Les Liaisons dangereuses", "Roman épistolaire");
  await addCategoryToBook("Le Tour du monde en 80 jours", "Aventure");
  await addCategoryToBook("Tartuffe", "Théâtre");
  await addCategoryToBook("Le Malade imaginaire", "Théâtre");
}

await addCategoriesToBooks();
console.log("Les catégories ont été associées aux livres avec succès !");


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
  await addBookToUser("literarymind", "À la recherche du temps perdu");

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

  await addMarkToBook("Les Misérables", "booklover92", 4, "Une œuvre monumentale.");
  await addMarkToBook("Notre-Dame de Paris", "readaholic21", 4, "Une histoire gothique fascinante.");
  await addMarkToBook("Le Comte de Monte-Cristo", "pagewanderer", 5, "Un roman d’aventure épique.");
  await addMarkToBook("À la recherche du temps perdu", "literarymind", 3, "Un style riche mais exigeant.");

  await addMarkToBook("Les Trois Mousquetaires", "booklover92", 5, "Un classique du roman de cape et d’épée.");
  await addMarkToBook("Le Rouge et le Noir", "readaholic21", 4, "Un portrait psychologique intense.");
  await addMarkToBook("L'Assommoir", "pagewanderer", 3, "Un réalisme cru et poignant.");
  await addMarkToBook("Germinal", "literarymind", 5, "Un chef-d’œuvre du naturalisme.");

  await addMarkToBook("Les Liaisons dangereuses", "booklover92", 4, "Manipulations et trahisons captivantes.");
  await addMarkToBook("Le Tour du monde en 80 jours", "readaholic21", 5, "Un voyage palpitant.");
  await addMarkToBook("Tartuffe", "pagewanderer", 4, "Une satire toujours d’actualité.");
  await addMarkToBook("Le Malade imaginaire", "literarymind", 3, "Un humour subtil et intelligent.");
}

await assignReviewsToBooks();
console.log("Les avis ont été ajoutés avec succès !");


console.log("✅ blablabook seed done with success !");
  
console.log("🧹 Clean up by closing database connexion");
await sequelize.close();
