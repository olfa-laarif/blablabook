import express from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser, updateUser, forgotPassword,resetPassword } from "../controllers/auth.controller.js";

import { loginLimiter } from "../middlewares/rateLimit.middleware.js";
import { controllerWrapper } from "../middlewares/controller.wrapper.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

// Routes d'authentification avec gestion sécurisée des erreurs
authRouter.post("/register", controllerWrapper(registerUser));
authRouter.post("/login", loginLimiter, controllerWrapper(loginUser));
authRouter.get("/logout", controllerWrapper(logoutUser));
authRouter.get("/connected-user", authenticateToken, controllerWrapper(getCurrentUser));
authRouter.patch("/update-user", authenticateToken, controllerWrapper(updateUser));
authRouter.post("/forgetPassword",controllerWrapper(forgotPassword));
authRouter.post("/resetPassword",controllerWrapper(resetPassword));


export { authRouter };