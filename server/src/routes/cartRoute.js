import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  syncCart,
  resetCart,
} from "../controllers/cartController.js";

const router = Router();

router.get("/", authenticate, getCart);

router.delete("/", authenticate, resetCart);

router.post("/add/:courseId", authenticate, addItemToCart);

router.post("/remove/:courseId", authenticate, removeItemFromCart);

router.post("/sync", authenticate, syncCart);

export default router;
