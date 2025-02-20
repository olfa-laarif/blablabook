import express from "express";
import { userController } from "../controllers/user.controller.js";
import { controllerWrapper } from "../middlewares/controller.wrapper.js";

const userRouter = express.Router();

userRouter.get('/email/:email', controllerWrapper(userController.getUserByEmail));
userRouter.get('/username/:username', controllerWrapper(userController.getUserByUsername));
userRouter.get('/:id(\\d+)', controllerWrapper(userController.getOneUser));
userRouter.get('/', controllerWrapper(userController.getAllUsers));



export { userRouter } 