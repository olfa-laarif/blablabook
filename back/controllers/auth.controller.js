import { User } from "../models/associations.js";
import { userCreateShema } from "../schemas/user.schema.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import nodemailer from "nodemailer";
import "dotenv/config";
import { validationResult, body } from "express-validator";
import {blacklist} from "../utils/blacklist.js";
import { addToBlacklist,isBlacklisted } from "../utils/blacklist.js";


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

  // Création de l'utilisateur dans la base de données
  try {
    console.log("Création de l'utilisateur avec les données :", { username, firstname, lastname, email, password });
    const newUser = await User.create({
      username,
      firstname,
      lastname,
      email,
      password: password, 
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
  const user = await User.findOne({
    where: { email }
  });
  if (!user) {
    throw new Error("ValidationError : Email incorrect.");
  }
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
    sameSite: "None",
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

//mettre à jour l'utilisateur
export async function updateUser(req, res) {
  try {
    const userId = req.user.id; // Récupération de l'ID utilisateur depuis le token

    await Promise.all([
      body("username").optional().trim().escape().run(req),
      body("firstname").optional().trim().escape().run(req),
      body("lastname").optional().trim().escape().run(req),
      body("email").optional().trim().escape().run(req),
      body("biography").optional().trim().escape().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Données invalides", details: errors.array() });
    }

    const { username, firstname, lastname, email, biography } = req.body;

    // Récupérer l'utilisateur actuel
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Vérifier si les données sont identiques avant de mettre à jour
    const updates = {};
    if (username && username !== user.username) updates.username = username;
    if (firstname && firstname !== user.firstname) updates.firstname = firstname;
    if (lastname && lastname !== user.lastname) updates.lastname = lastname;
    if (email && email !== user.email) updates.email = email;
    if (biography && biography !== user.biography) updates.biography = biography;

    // Si aucun changement, on évite l'update inutile
    if (Object.keys(updates).length === 0) {
      return res.status(200).json({ message: "Aucune modification détectée", user });
    }

    // Mise à jour des données modifiées uniquement
    await user.update(updates);

    res.status(200).json({ message: "Profil mis à jour avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}


// Génération du token de réinitialisation (valide 15 min)
function generateResetToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
}

export async function forgotPassword(req, res){

  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: "Aucun compte trouvé." });

  const token = generateResetToken(user.id);
  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  // Envoi d'e-mail
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Réinitialisation de mot de passe",
    html: `Cliquez ici pour réinitialiser: <a href="${resetLink}">Réinitialiser le mot de passe</a>`
  });

  res.json({ message: "Email envoyé." });

}

export async function resetPassword(req, res){
  const { token, newPassword } = req.body;

   // Vérifie si le token est déjà utilisé
  if (isBlacklisted(token)) {
    return res.status(400).json({ error: "Lien déjà utilisé ou expiré" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

     await user.update({ password: newPassword });

    // Invalide le token en le mettant dans la blacklist
    addToBlacklist(token);
   

    res.json({ message: "Mot de passe mis à jour avec succès" });
  } catch (err) {
    res.status(400).json({ error: "Lien expiré ou invalide." });
  }


}



