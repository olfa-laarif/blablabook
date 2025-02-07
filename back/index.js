import "dotenv/config";
import express from "express";
import { router } from "./router.js";

// Création de l'app
export const app = express();
app.use(router);

app.use((req, res) => {
    res.send("c'est oki!");
  });


// Démarrer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});