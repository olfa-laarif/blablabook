import 'dotenv/config';
import { sequelize } from '../models/sequelizeClient.js';


// Même si on utilise pas les modèles directement, il faut tout de même les importer pour que la synchronisation de sequelize en soit informé.
import { User, Book, Author,Category,Mark } from '../models/associations.js';

await sequelize.drop();

await sequelize.sync();

console.log('Synchronisation terminée');

// On pense a terminer la connexion à la BDD à la fin
await sequelize.close();