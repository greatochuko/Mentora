import { Router } from "express";
import {
  getAllCourses,
  getPopularCourses,
  searchCourses,
} from "../controllers/courseController.js";

const router = Router();

router.get("/", getAllCourses);
router.get("/search", searchCourses);
router.get("/popular", getPopularCourses);

export default router;
