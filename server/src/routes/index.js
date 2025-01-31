import { Router } from "express";
import authRoutes from "./authRoute.js";

const router = Router();

router.use("/auth", authRoutes);

export default router;
