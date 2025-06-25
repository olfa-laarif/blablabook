import { Book, Author, Category } from '../models/associations.js';

const STATIC_BOOKS = [
  "L'Étranger", "Le Petit Prince", "Les Misérables", "Notre-Dame de Paris",
  "Madame Bovary", "Les Fleurs du Mal", "L'Être et le Néant", "Germinal",
  "Du côté de chez Swann", "Le Comte de Monte-Cristo", "Les Trois Mousquetaires",
  "Le Rouge et le Noir", "Le Malade Imaginaire", "Vingt Mille Lieues sous les mers",
  "À la recherche du temps perdu", "Les Liaisons dangereuses", "Le Tour du monde en 80 jours",
  "Tartuffe", "L'Assommoir"
];

const GOOGLE_API_URL = "https://www.googleapis.com/books/v1";
const LIMIT = 40;
const TOTAL_NEEDED = 100;

const ALLOWED_CATEGORIES = [
  "Comics & Graphic Novels",
  "Fiction",
  "Literary Collections",
  "Poetry",
  "Philosophy",
  "Adventure stories"
];

const createdCategories = new Set();

// 📌 Récupère les infos d'un livre
const fetchBookInfo = async (title) => {
  try {
    const response = await fetch(`${GOOGLE_API_URL}/volumes?q=intitle:${encodeURIComponent(title)}&langRestrict=fr`);
    const data = await response.json();

    if (!data.items || data.items.length === 0) return null;

    const book = data.items[0].volumeInfo;
    const bookCategories = book.categories || [];

    // Vérifie si le livre appartient aux catégories autorisées
    if (!bookCategories.some(cat => ALLOWED_CATEGORIES.includes(cat))) return null;

    return {
      title: book.title,
      summary: book.description || "Résumé non disponible.",
      published_date: book.publishedDate || "Date inconnue",
      image: book.imageLinks?.thumbnail?.replace("&zoom=1", "&zoom=3").replace("http://", "https://") ,
      availability: Math.random() > 0.5,
      categories: bookCategories,
      authors: book.authors ? book.authors.map(author => {
        const nameParts = author.split(' ');
        return {
          firstname: nameParts.slice(0, -1).join(' ') || "Inconnu",
          lastname: nameParts.slice(-1).join(' ') || ""
        };
      }) : [{ firstname: "Inconnu", lastname: "" }]
    };
  } catch (error) {
    console.error(`Erreur avec le livre "${title}" :`, error);
    return null;
  }
};

// 📌 Récupère des livres récents (après 2000) en français
async function fetchFrenchBooks() {
  let books = [];
  let startIndex = 0;

  while (books.length < TOTAL_NEEDED) {
    try {
      const response = await fetch(`${GOOGLE_API_URL}/volumes?q=subject:fiction+language:fr&filter=ebooks&printType=books&maxResults=${LIMIT}&startIndex=${startIndex}`);
      const data = await response.json();

      if (!data.items) break;

      const validBooks = data.items
        .filter(book => book.volumeInfo.imageLinks?.thumbnail)
        .filter(book => book.volumeInfo.authors?.length)
        .filter(book => book.volumeInfo.publishedDate && parseInt(book.volumeInfo.publishedDate) > 2000)
        .filter(book => book.volumeInfo.language === 'fr')
        .filter(book => book.volumeInfo.categories?.some(cat => ALLOWED_CATEGORIES.includes(cat)))
        .map(book => ({
          title: book.volumeInfo.title,
          summary: book.volumeInfo.description || "Résumé non disponible.",
          published_date: book.volumeInfo.publishedDate || "",
          image: book.volumeInfo.imageLinks.thumbnail.replace("&zoom=1", "&zoom=3").replace("http://", "https://"),
          availability: Math.random() > 0.5,
          categories: book.volumeInfo.categories || ["Inconnu"],
          authors: book.volumeInfo.authors.map(author => {
            const nameParts = author.split(' ');
            return {
              firstname: nameParts.slice(0, -1).join(' ') || "Inconnu",
              lastname: nameParts.slice(-1).join(' ') || ""
            };
          })
        }));

      books = [...books, ...validBooks];
     
      
      startIndex += LIMIT;
    } catch (error) {
      console.error("Erreur lors de la récupération des livres :", error);
      break;
    }
  }

  return books.slice(0, TOTAL_NEEDED);
}

// 📌 Insère les livres, auteurs et catégories
export async function populateDatabase() {
  const staticBooks = await Promise.all(STATIC_BOOKS.map(fetchBookInfo));
  const filteredStaticBooks = staticBooks.filter(book => book !== null);
  const dynamicBooks = await fetchFrenchBooks();

  // 🔹 Fusionne les livres et enlève les doublons
  const books = [...filteredStaticBooks, ...dynamicBooks]
    .reduce((acc, book) => acc.some(b => b.title === book.title) ? acc : [...acc, book], [])
    .slice(0, TOTAL_NEEDED);

  for (const bookData of books) {
    const existingBook = await Book.findOne({ where: { title: bookData.title } });
    if (existingBook) continue;

    const book = await Book.create({
      title: bookData.title,
      summary: bookData.summary,
      published_date: bookData.published_date,
      image: bookData.image,
      status: bookData.status,
      availability: bookData.availability
    });

    // 🔹 Associe les auteurs
    for (const authorData of bookData.authors) {
      const [author] = await Author.findOrCreate({
        where: { firstname: authorData.firstname, lastname: authorData.lastname },
        defaults: { biography: "Biographie non disponible." }
      });
      await book.setAuthor(author);
    }

    // 🔹 Associe les catégories
    for (const categoryName of bookData.categories) {
      const [category, created] = await Category.findOrCreate({
        where: { name: categoryName }
      });

      if (created) createdCategories.add(categoryName);
      await book.addCategory(category);
    }
  }

  console.log("📂 Catégories créées :", [...createdCategories]);
  console.log(`📚 ${books.length} livres valides ont été ajoutés à la base de données !`);
}
