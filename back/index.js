import "dotenv/config";
import express from "express";
import { router } from "./router.js";
import cors from "cors";

// Création de l'app
export const app = express();
app.use(cors());
app.use(express.json());

app.use(router);



// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});