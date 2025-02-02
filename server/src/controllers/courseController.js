import Course from "../models/Course.js";

export async function getAllCourses(req, res) {
  try {
    const allCourses = await Course.find();
    res.status(200).json({
      message: "Courses retrieved successfully",
      success: true,
      data: allCourses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getPopularCourses(req, res) {
  try {
    const allCourses = await Course.find().sort({ "reviews.length": -1 });
    res.status(200).json({
      message: "Courses retrieved successfully",
      success: true,
      data: allCourses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
