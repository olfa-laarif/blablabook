
import { Book } from "./book.model.js";
import {Author} from "./author.model.js";
import {Category} from "./category.model.js";
import {User} from "./user.model.js";
import {Mark} from "./mark.model.js";
import { Library } from "./library.model.js";



// Author <--> Book : association "one-to-many"
// hasMany est utilisé pour une association OneToMany
Author.hasMany(Book, {
  /* Par défaut le comportement lors de la suppression des association met la valeur de 
  la clé étrangère à null, nous on défini une suppression des associations en cascade*/
  onDelete: 'CASCADE',
});

Book.belongsTo(Author);


// Book <--> Category : association many-to-many
// belongsToMany est utilisé pour les associations ManyToMany
Book.belongsToMany(Category, {
  // pour définir la table d'association on peut lui fournir une chaine de caractère qui représente le nom de la table ou un Model si jamais on en a  créer un (sachant que si la table d'association n'a pas de colonne qualifiante, cela ne sert a rien de déclarer un modèle pour celle-ci)
  through: 'book_has_category'
  // Si on ne précise pas la foreignKey, par défaut ce sera <model>Id ; donc ici BookId
});

//Unlike One-To-One and One-To-Many relationships, 
//the defaults for both ON UPDATE and ON DELETE are CASCADE for Many-To-Many relationships.
Category.belongsToMany(Book,{
  through:'book_has_category'
});


// user <--> Book : association many-to-many
// Association Many-to-Many avec modèle Library
Book.belongsToMany(User, { through: Library });
User.belongsToMany(Book, { through: Library });

// User <--> Mark : association "one-to-many"
User.hasMany(Mark,{
  onDelete: 'CASCADE',
});
Mark.belongsTo(User);

// Book <--> Mark : association "one-to-many"
Book.hasMany(Mark,{
  onDelete: 'CASCADE',
});
Mark.belongsTo(Book);


// on rééxporte les modèles avec leur associations
export { User, Book, Author,Category,Mark ,Library};


