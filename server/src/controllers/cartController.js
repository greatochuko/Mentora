import User from "../models/User.js";

export async function getCart(req, res) {
  try {
    const user = await User.findById(req.userId).populate({
      path: "cart",
      populate: {
        path: "course",
        select: "title thumbnail user price reviews",
        populate: { path: "user", select: "firstName lastName profilePicture" },
      },
    });

    res.status(200).json({
      message: "Cart retrieved successfully",
      data: user.cart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function addItemToCart(req, res) {
  try {
    const { courseId } = req.params;

    const updatedUser = await User.findById(req.userId);
    updatedUser.cart = [...updatedUser.cart, { course: courseId }];
    await updatedUser.save();

    if (!updatedUser)
      return res.status(400).json({
        message: "Unable to add course to cart",
        data: null,
      });

    res.status(200).json({
      message: "Course added to cart successfully",
      data: updatedUser.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function removeItemFromCart(req, res) {
  try {
    const { courseId } = req.params;

    const updatedUser = await User.findById(req.userId).populate({
      path: "cart",
      populate: {
        path: "course",
        select: "title thumbnail user price reviews",
        populate: { path: "user", select: "firstName lastName profilePicture" },
      },
    });
    updatedUser.cart = updatedUser.cart.filter(
      (item) => item.course._id.toString() !== courseId
    );
    await updatedUser.save();

    if (!updatedUser)
      return res.status(400).json({
        message: "Unable to add course to cart",
        data: null,
      });

    res.status(200).json({
      message: "Course added to cart successfully",
      data: updatedUser.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function syncCart(req, res) {
  try {
    const { courses } = req.body;

    const userToUpdate = await User.findById(req.userId);

    if (!userToUpdate)
      return res.status(400).json({
        message: "Unable to sync cart",
        data: null,
      });

    userToUpdate.cart = [
      ...userToUpdate.cart,
      ...courses.map((courseId) => ({ course: courseId })),
    ].filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => t.course.toString() === item.course.toString())
    );

    await userToUpdate.save();

    const updatedUser = await User.findById(req.userId).populate({
      path: "cart",
      populate: {
        path: "course",
        select: "title thumbnail user price reviews",
        populate: { path: "user", select: "firstName lastName profilePicture" },
      },
    });

    res.status(200).json({
      message: "Cart synced successfully",
      data: updatedUser.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function resetCart(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { cart: [] },
      { new: true }
    );

    if (!updatedUser) {
      res.status(400).json({
        message: "Unable to reset cart",
        data: null,
      });
    }

    res.status(200).json({
      message: "Cart reset successfully",
      data: updatedUser.cart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}
