import jwt from "jsonwebtoken";
import { User } from "../models/associations.js";
import {blacklist} from "../utils/blacklist.js";

/**
 * Vérifie le token JWT et attache l'utilisateur à `req.user`
 * On fera juste req.user pour récupérer l'utlisateur connecté
 */
export async function authenticateToken(req, res, next) {
  const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
  if (!token || blacklist.has(token)) {
    return res.status(401).json({ error: "Authentification requise." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] }, // Ne pas renvoyer le mot de passe
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    req.user = user; // Ajoute l'utilisateur à la requête
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token invalide ou expiré." });
  }
}