import { Router } from "express";
import authRoutes from "./authRoute.js";
import courseRoutes from "./courseRoute.js";
import cartRoutes from "./cartRoute.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/cart", cartRoutes);

export default router;
