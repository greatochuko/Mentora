import { Router } from "express";
import {
  getAllCourses,
  getPopularCourses,
  searchCourses,
  getCourse,
  populate,
  getCourseLearning,
} from "../controllers/courseController.js";

const router = Router();

router.get("/", getAllCourses);
router.get("/search", searchCourses);
router.get("/popular", getPopularCourses);
router.get("/id/:courseId", getCourse);
router.get("/learning/:courseId", getCourseLearning);
router.get("/populate", populate);

export default router;
