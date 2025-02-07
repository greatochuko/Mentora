import Course from "../models/Course.js";
import "../models/User.js";

export async function getAllCourses(req, res) {
  try {
    const allCourses = await Course.find().populate({
      path: "user",
      populate: "firstName lastName profilePicture",
    });

    res.status(200).json({
      message: "Courses retrieved successfully",
      success: true,
      data: allCourses,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function searchCourses(req, res) {
  try {
    const { query, page, sort } = req.query;

    const options =
      query && query !== "null" && query !== "undefined"
        ? { title: { $regex: query, $options: "i" } }
        : {};
    const limit = 12;
    const skip = (page - 1) * limit;

    const paginatedCourses = await Course.find(options)
      .populate({
        path: "user",
        populate: "firstName lastName profilePicture",
      })
      .sort({ createdAt: sort === "oldest" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    const totalCourses = await Course.countDocuments(options);
    const totalPages = Math.ceil(totalCourses / limit);

    res.status(200).json({
      message: "Courses retrieved successfully",
      success: true,
      data: paginatedCourses,
      page: page,
      totalPages,
      totalCourses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getPopularCourses(req, res) {
  try {
    const allCourses = await Course.find().sort({ "reviews.length": -1 });
    res
      .status(200)
      .json({
        message: "Courses retrieved successfully",
        success: true,
        data: allCourses.slice(0, 8),
      })
      .populate({
        path: "user",
        populate: "firstName lastName profilePicture",
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
}

export async function getCourse(req, res) {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate({
      path: "user",
      populate: "firstName lastName profilePicture",
    });

    if (!course)
      res.status(404).json({
        message: "Courses not found",
        success: false,
        data: course,
      });

    res.status(200).json({
      message: "Courses retrieved successfully",
      success: true,
      data: course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
}
