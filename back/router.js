import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import { bookRouter } from "./routes/book.routes.js";
import { userRouter } from "./routes/user.routes.js";

const router = express.Router();

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

router.use(authRouter);
router.use(bookRouter);
router.use(userRouter);


export { router };


