import { Router } from "express";
import { updateUser } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.patch("/", authenticate, updateUser);

export default router;
