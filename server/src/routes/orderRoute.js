import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { getOrder, checkout } from "../controllers/orderController.js";

const router = Router();

router.get("/:orderId", authenticate, getOrder);

router.post("/", authenticate, checkout);

export default router;
