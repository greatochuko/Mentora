import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  syncCart,
  checkout,
} from "../controllers/cartController.js";

const router = Router();

router.get("/", authenticate, getCart);

router.post("/add/:courseId", authenticate, addItemToCart);

router.post("/remove/:courseId", authenticate, removeItemFromCart);

router.post("/sync", authenticate, syncCart);

router.post("/checkout", authenticate, checkout);

export default router;
