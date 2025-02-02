import Course from "../models/Course.js";

export async function getAllCourses(req, res) {
  try {
    const allCourses = await Course.find();

    res.status(200).json({
      message: "Courses retrieved successfully",
      success: true,
      data: paginatedCourses,
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
    res.status(200).json({
      message: "Courses retrieved successfully",
      success: true,
      data: allCourses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
