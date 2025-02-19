import express from "express";
import { userController } from "../controllers/user.controller.js";
import { controllerWrapper } from "../middlewares/controller.wrapper.js";

const userRouter = express.Router();

userRouter.get('/email/:email', controllerWrapper(userController.getUserByEmail));
userRouter.get('/username/:username', controllerWrapper(userController.getUserByUsername));
userRouter.get('/:id(\\d+)', controllerWrapper(userController.getOneUser));
userRouter.get('/', controllerWrapper(userController.getAllUsers));


// Gestion des erreurs 404
userRouter.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export { userRouter } 