import { Router } from "express";
import {
  getAllCourses,
  getPopularCourses,
  searchCourses,
  getCourse,
} from "../controllers/courseController.js";

const router = Router();

router.get("/", getAllCourses);
router.get("/search", searchCourses);
router.get("/popular", getPopularCourses);
router.get("/id/:courseId", getCourse);

export default router;
