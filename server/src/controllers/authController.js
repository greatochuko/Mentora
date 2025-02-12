import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";

export async function register(req, res) {
  try {
    // Get the user input
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Please provide the name, email and password",
      });
    }

    // Check if the email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res
        .status(422)
        .json({ message: "Invalid email", success: false, data: null });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "User with this email already exists",
        success: false,
        data: null,
      });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user to the database
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const newUser = await User.findById(createdUser._id).select("-password");

    // Create a token
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      message: "User created successfully",
      data: newUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    // Get the user input
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide the email and password",
        success: false,
        data: null,
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email and password combination",
        success: false,
        data: null,
      });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email and password combination",
        success: false,
        data: null,
      });
    }

    // Create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "None",
    });

    res.json({
      message: "Login successful",
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getSession(req, res) {
  try {
    const user = await User.findById(req.userId).select(
      "firstName lastName profilePicture"
    );

    const userOrders = await Order.find({ user: req.userId }).populate({
      path: "courses",
      select: "title thumbnail reviews user",
      populate: { path: "user", select: "firstName lastName profilePicture" },
    });

    const paidCourses = userOrders.flatMap((order) => order.courses);

    res.status(200).json({
      message: "Session active",
      success: true,
      data: { ...user._doc, paidCourses },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function logout(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(0),
  });
  res
    .status(200)
    .json({ message: "Logged out successfully", success: true, data: null });
}
