import express from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controllers/auth.controller.js";

import { loginLimiter } from "../middlewares/rateLimit.middleware.js";
import { controllerWrapper } from "../middlewares/controller.wrapper.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

// Routes d'authentification avec gestion sécurisée des erreurs
authRouter.post("/api/users/register", controllerWrapper(registerUser));
authRouter.post("/api/users/login", loginLimiter, controllerWrapper(loginUser));
authRouter.get("/api/users/logout", controllerWrapper(logoutUser));
authRouter.get("/api/users/connected-user", authenticateToken, controllerWrapper(getCurrentUser));


export { authRouter };