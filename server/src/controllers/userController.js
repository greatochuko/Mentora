import User from "../models/User.js";
import Order from "../models/Order.js";

export async function updateUser(req, res) {
  try {
    const { firstName, lastName, profilePicture } = req.body;
    const userToUpdate = await User.findByIdAndUpdate(
      req.userId,
      {
        firstName,
        lastName,
        profilePicture,
      },
      { new: true }
    ).select("firstName lastName profilePicture");

    if (!userToUpdate)
      return res.status(400).json({
        message: "Unable to update user",
        success: true,
        data: null,
      });

    const userOrders = await Order.find({ user: req.userId }).populate({
      path: "courses",
      select: "title thumbnail reviews user",
      populate: { path: "user", select: "firstName lastName profilePicture" },
    });

    const paidCourses = userOrders.flatMap((order) => order.courses);

    res.status(200).json({
      message: "User updated sucessfully",
      success: true,
      data: { ...userToUpdate._doc, paidCourses },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
