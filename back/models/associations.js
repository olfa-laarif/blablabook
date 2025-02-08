
import { Book } from "./book.model.js";
import {Author} from "./author.model.js"

// hasMany est utilisé pour une association OneToMany
Author.hasMany(Book, {
  /* Par défaut le comportement lors de la suppression des association met la valeur de 
  la clé étrangère à null, nous on défini une suppression des associations en cascade*/
  onDelete: 'CASCADE',
});

