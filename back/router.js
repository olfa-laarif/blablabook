import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import { bookRouter } from "./routes/book.routes.js";
import { userRouter } from "./routes/user.routes.js";

const router = express.Router();

router.use("/api/users", userRouter);
router.use("/api/auth", authRouter);
router.use("/api/books", bookRouter);




export { router };


