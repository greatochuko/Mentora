import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
} from "../controllers/cartController.js";

const router = Router();

router.get("/", authenticate, getCart);

router.post("/add/:courseId", authenticate, addItemToCart);

router.post("/remove/:courseId", authenticate, removeItemFromCart);

export default router;
