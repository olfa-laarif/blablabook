import "dotenv/config";
import express from "express";
import { router } from "./router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { bodySanitizer } from "./middlewares/sanitize.middleware.js";
import { helmetConfig } from "./config/helmetConfig.js";

// Création de l'application
export const app = express();
app.use(cors({
  origin: "http://localhost:5173", // L'origine du front-end
  credentials: true, // Autorise l'envoi des cookies
  methods: ["GET", "POST", "PUT", "DELETE"], // Autoriser les méthodes HTTP nécessaires
  allowedHeaders: ["Content-Type", "Authorization"], // Autoriser les headers nécessaires
}));

app.use(express.json());
app.use(cookieParser());
app.use(helmetConfig);

// Middleware de nettoyage des entrées
app.use(bodySanitizer);

// Routes
app.use(router);

// Démarrage du serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});