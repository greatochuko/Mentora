import { Router } from "express";
import {
  getAllCourses,
  getPopularCourses,
} from "../controllers/courseController.js";

const router = Router();

router.get("/", getAllCourses);
router.get("/popular", getPopularCourses);

export default router;
