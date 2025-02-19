import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import { bookRouter } from "./routes/book.routes.js";

const router = express.Router();

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

router.use(authRouter);
router.use(bookRouter);


export { router };


