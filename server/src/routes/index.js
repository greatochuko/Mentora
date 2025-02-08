import { Router } from "express";
import authRoutes from "./authRoute.js";
import userRoutes from "./userRoute.js";
import courseRoutes from "./courseRoute.js";
import cartRoutes from "./cartRoute.js";
import orderRoutes from "./orderRoute.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/courses", courseRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);

export default router;
