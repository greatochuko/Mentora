import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function authenticate(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Invalid token", success: false, data: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized", success: false, data: null });
    }

    req.userId = user._id;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
