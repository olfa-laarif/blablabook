import { User } from "../models/user.model.js";
import { userCreateShema } from "../schemas/user.schema.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { validationResult, body } from "express-validator";

const blacklist = new Set();


/**
 * Inscription d'un utilisateur
 */
export async function registerUser(req, res) {
  // Assainissement des champs (confirmPassword n'est pas traité ici car il n'est utilisé que côté client)
  await Promise.all([
    body("username").trim().escape().run(req),
    body("firstname").trim().escape().run(req),
    body("lastname").trim().escape().run(req),
    body("email").trim().escape().run(req),
  ]);

  // Vérification des erreurs d'assainissement
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("ValidationError : Données invalides"); // Capturé par controllerWrapper
  }

  // Validation du schéma (ici, confirmPassword n'est pas inclus car inutile côté serveur)
  const { error } = userCreateShema.validate(req.body);
  if (error) {
    throw new Error("ValidationError : " + error.details[0].message);
  }

  // Extraction des champs nécessaires (confirmPassword est supposé avoir été vérifié côté client)
  const { username, firstname, lastname, email, password, biography } = req.body;

  // Vérifier si l'email est déjà utilisé
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("ValidationError : Cet email est déjà utilisé.");
  }

  // Vous pouvez hacher le mot de passe avant de le stocker (ici, c'est commenté)
  // const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });

  // Création de l'utilisateur dans la base de données
  try {
    console.log("Création de l'utilisateur avec les données :", { username, firstname, lastname, email, password });
    const newUser = await User.create({
      username,
      firstname,
      lastname,
      email,
      password: password, // Remplacez par hashedPassword si vous hachez le mot de passe
    });
    console.log("Utilisateur créé avec succès :", newUser);
  } catch (dbError) {
    console.error("Erreur lors de la création de l'utilisateur en base :", dbError);
    throw new Error("Internal Server Error during user creation");
  }

  // Envoi de la réponse de succès
  console.log("Envoi de la réponse de succès");
  res.status(201).json({ message: "Utilisateur créé avec succès !" });
}


/**
 * Connexion d'un utilisateur et stockage sécurisé du token JWT
 */
export async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("ValidationError : Email incorrect.");
  }

  console.log(user.password);
  const validPassword = await argon2.verify(user.password, password);
  if (!validPassword) {
    throw new Error("ValidationError : Mot de passe incorrect.");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Connexion réussie !" });
}


/**
 * Récupérer l'utilisateur actuellement connecté
 */
export async function getCurrentUser(req, res) {
    if (!req.user) {
      return res.status(401).json({ error: "Utilisateur non authentifié." });
    }
  
    res.status(200).json({
      message: "Utilisateur connecté",
      user: req.user, // L'utilisateur est déjà attaché à `req.user` par le middleware
    });
  }


/**
 * Déconnexion sécurisée
 */
export async function logoutUser(req, res) {
  const token = req.cookies?.token;

  if (token) {
    blacklist.add(token);
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Déconnexion réussie." });
}