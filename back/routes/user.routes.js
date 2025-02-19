import express from "express";
import { userController } from "../controllers/user.controller.js";
import { controllerWrapper } from "../middlewares/controller.wrapper.js";

const userRouter = express.Router();

//Route pour recuperer un  utilisateur par son email
userRouter.get('/api/user/email/:email',controllerWrapper(userController.getUserByEmail));

//Route pour recuperer un  utilisateur par son pseudo
userRouter.get('/api/user/username/:username',controllerWrapper(userController.getUserByUsername));

userRouter.get('/api/user/username/:id',controllerWrapper(userController.getOneUser));

export { userRouter } 