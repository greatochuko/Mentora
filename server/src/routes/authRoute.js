import bcrypt from "bcryptjs";
import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    // Get the user input
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide the name, email and password" });
    }

    // Check if the email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check if the user already exists
    const userExists = await User.find({ email });
    if (userExists.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
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

    res
      .status(200)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", (req, res) => {
  res.json({ message: "Login route" });
});

export default router;
