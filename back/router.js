import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import { bookRouter } from "./routes/book.routes.js";

const router = express.Router();

router.use(authRouter);
router.use(bookRouter);

export { router };


