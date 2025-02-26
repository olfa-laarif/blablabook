import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Library extends Model {}

Library.init(
  {
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "à lire", // Valeur par défaut
    },
  },
  {
    sequelize,
    tableName: "library",
  }
);
