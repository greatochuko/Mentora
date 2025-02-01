import { Router } from "express";
import { login, register, getSession } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/session", getSession);

export default router;
