import { Router } from "express";
import authRoutes from "./authRoute.js";
import courseRoutes from "./courseRoute.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);

export default router;
