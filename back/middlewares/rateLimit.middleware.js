import rateLimit from "express-rate-limit";

/**
 * Limite le nombre de tentatives de connexion pour éviter les attaques brute force.
 * - 5 tentatives max par IP toutes les 15 minutes
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 tentatives par IP
  message: {
    error: "Trop de tentatives de connexion. Réessayez plus tard.",
  },
  standardHeaders: true, // Retourne les infos de limitation dans les headers
  legacyHeaders: false, // Désactive les headers obsolètes
});