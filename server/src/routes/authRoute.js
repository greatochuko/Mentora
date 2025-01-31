import bcrypt from "bcryptjs";
import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { login, register } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

export default router;
