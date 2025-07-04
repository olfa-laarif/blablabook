import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Book extends Model{};

Book.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  published_date: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  availability:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }

}, {
  sequelize,
  tableName: "Book", // Spécifie explicitement le nom de la table
});


/*
CREATE TABLE "book" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,   
    "authorId" INTEGER NOT NULL REFERENCES "author"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "publishedDate" DATE NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL
);
*/
