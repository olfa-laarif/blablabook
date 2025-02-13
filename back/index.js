import "dotenv/config";
import express from "express";
import { router } from "./router.js";
import cors from "cors";
import { bodySanitizer } from "./middlewares/sanitize.middleware.js";

// Création de l'app
export const app = express();
app.use(cors());
app.use(express.json());

// utilisation du middleware "sanitizer" ici avant le router afin de nettoyer tous les body qui arrivent au router (en mode NTUI - Never Trust User InputU)
app.use(bodySanitizer);

app.use(router);



// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});