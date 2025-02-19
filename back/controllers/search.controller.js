import { Op } from "sequelize";
import { Book } from "../../models/book.model.js";
import redis from "redis";

// Initialisation du cache Redis
const redisClient = redis.createClient();
redisClient.connect();

/**
 * Recherche optimisée de livres
 */
export async function searchBooks(req, res) {
  try {
    const { query } = req.query; // Récupère le terme de recherche
    if (!query || query.length < 2) {
      return res.status(400).json({ error: "Veuillez entrer au moins 2 caractères." });
    }

    const cacheKey = `search:${query.toLowerCase()}`;
    
    // Vérifier si les résultats sont déjà en cache Redis
    const cachedResults = await redisClient.get(cacheKey);
    if (cachedResults) {
      return res.status(200).json(JSON.parse(cachedResults));
    }

    // Effectuer la recherche en base de données
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { author: { [Op.iLike]: `%${query}%` } },
          { category: { [Op.iLike]: `%${query}%` } },
          { published_date: { [Op.iLike]: `%${query}%` } }
        ],
      },
      limit: 10, // Limiter à 10 résultats pour éviter les performances lentes
    });

    // Mettre en cache les résultats pour 1 heure
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(books));

    res.status(200).json(books);
  } catch (error) {
    console.error("Erreur de recherche :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}