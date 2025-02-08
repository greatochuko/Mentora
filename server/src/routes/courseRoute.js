import { Router } from "express";
import {
  getAllCourses,
  getPopularCourses,
  searchCourses,
  getCourse,
  populate,
  getCourseLearning,
  getAllCoursesByUser,
  createCourse,
} from "../controllers/courseController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/", getAllCourses);

router.post("/", authenticate, createCourse);

router.get("/user/:userId", getAllCoursesByUser);

router.get("/search", searchCourses);

router.get("/popular", getPopularCourses);

router.get("/id/:courseId", getCourse);

router.get("/learning/:courseId", getCourseLearning);

router.get("/populate", populate);

export default router;
