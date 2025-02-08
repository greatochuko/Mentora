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

export async function createCourse(req, res) {
  try {
    const newCourse = await Course.create({ ...req.body, user: req.userId });

    res.status(200).json({
      message: "Courses created successfully",
      success: true,
      data: newCourse,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function updateCourse(req, res) {
  try {
    const { courseId } = req.params;
    const newCourse = await Course.findByIdAndUpdate(courseId, req.body);

    res.status(200).json({
      message: "Courses created successfully",
      success: true,
      data: newCourse,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function getAllCoursesByUser(req, res) {
  try {
    const { userId } = req.params;
    const allCourses = await Course.find({ user: userId })
      .populate({
        path: "user",
        populate: "firstName lastName profilePicture",
      })
      .sort({ createdAt: -1 });

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
    const allCourses = await Course.find()
      .populate({
        path: "user",
        populate: "firstName lastName profilePicture",
      })
      .sort({ "reviews.length": -1 });

    res.status(200).json({
      message: "Courses retrieved successfully",
      success: true,
      data: allCourses.slice(0, 8),
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
    const course = await Course.findById(courseId)
      .populate({
        path: "user",
        populate: "firstName lastName profilePicture",
      })
      .populate({ path: "content", select: "title description duration" });

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

export async function getCourseLearning(req, res) {
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

export async function populate(req, res) {
  const courseContent = [
    {
      title: "Introduction to the Course",
      description: "Overview of what will be covered in the course.",
      video: {
        fileName: "3125427-sd_640_360_25fps.mp4",
        url: "https://videos.pexels.com/video-files/3125427/3125427-sd_640_360_25fps.mp4",
        duration: 300,
      },
    },
    {
      title: "Getting Started with React",
      description:
        "Introduction to React and setting up the development environment.",
      video: {
        fileName: "3125427-sd_640_360_25fps.mp4",
        url: "https://videos.pexels.com/video-files/3125427/3125427-sd_640_360_25fps.mp4",
        duration: 1800,
      },
    },
    {
      title: "Components and Props",
      description: "Understanding components and props in React.",
      video: {
        fileName: "3125427-sd_640_360_25fps.mp4",
        url: "https://videos.pexels.com/video-files/3125427/3125427-sd_640_360_25fps.mp4",
        duration: 2400,
      },
    },
    {
      title: "State and Lifecycle",
      description: "Managing state and lifecycle methods in React.",
      video: {
        fileName: "3125427-sd_640_360_25fps.mp4",
        url: "https://videos.pexels.com/video-files/3125427/3125427-sd_640_360_25fps.mp4",
        duration: 2700,
      },
    },
    {
      title: "Handling Events",
      description: "Handling events in React applications.",
      video: {
        fileName: "3125427-sd_640_360_25fps.mp4",
        url: "https://videos.pexels.com/video-files/3125427/3125427-sd_640_360_25fps.mp4",
        duration: 1500,
      },
    },
    {
      title: "Conditional Rendering",
      description: "Implementing conditional rendering in React.",
      video: {
        fileName: "3125427-sd_640_360_25fps.mp4",
        url: "https://videos.pexels.com/video-files/3125427/3125427-sd_640_360_25fps.mp4",
        duration: 1200,
      },
    },
    {
      title: "Lists and Keys",
      description: "Working with lists and keys in React.",
      video: {
        fileName: "3125427-sd_640_360_25fps.mp4",
        url: "https://videos.pexels.com/video-files/3125427/3125427-sd_640_360_25fps.mp4",
        duration: 1800,
      },
    },
    {
      title: "Forms",
      description: "Building and managing forms in React.",
      video: {
        fileName: "3125427-sd_640_360_25fps.mp4",
        url: "https://videos.pexels.com/video-files/3125427/3125427-sd_640_360_25fps.mp4",
        duration: 2100,
      },
    },
    {
      title: "Lifting State Up",
      description: "Techniques for lifting state up in React.",
      video: {
        fileName: "3125427-sd_640_360_25fps.mp4",
        url: "https://videos.pexels.com/video-files/3125427/3125427-sd_640_360_25fps.mp4",
        duration: 1800,
      },
    },
    {
      title: "Composition vs Inheritance",
      description: "Understanding composition vs inheritance in React.",
      video: {
        fileName: "3125427-sd_640_360_25fps.mp4",
        url: "https://videos.pexels.com/video-files/3125427/3125427-sd_640_360_25fps.mp4",
        duration: 1500,
      },
    },
  ];
  await Course.updateMany({}, { content: courseContent });
  res.json({ success: true });
}
