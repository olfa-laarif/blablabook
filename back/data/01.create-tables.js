import 'dotenv/config';
import { sequelize } from '../models/sequelizeClient.js';


// Même si on utilise pas les modèles directement, il faut tout de même les importer pour que la synchronisation de sequelize en soit informé.
import { User, Book, Author,Category,Mark } from '../models/associations.js';

await sequelize.drop();

await sequelize.sync();

console.log('✅ Synchronisation des tables terminée.');

try {
    // Vérifier que l'extension pg_trgm est activée
    await sequelize.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
  
    // Création des index optimisés
    await sequelize.query(`
      CREATE INDEX IF NOT EXISTS book_title_idx ON "Books" USING GIN (title gin_trgm_ops);
      CREATE INDEX IF NOT EXISTS book_date_idx ON "Books" (published_date);
      CREATE INDEX IF NOT EXISTS category_name_idx ON "Categories" USING GIN (name gin_trgm_ops);
      CREATE INDEX IF NOT EXISTS author_lastname_idx ON "Authors" USING GIN (lastname gin_trgm_ops);
    `);
    
    console.log('📌 Index PostgreSQL créés avec succès.');
  
  } catch (error) {
    console.error('❌ Erreur lors de la création des index :', error);
  }

// On pense a terminer la connexion à la BDD à la fin
await sequelize.close();