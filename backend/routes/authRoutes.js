const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      hashedP: hashedPassword,
      role: "user",
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", name, email, role: "user" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// POST /api/auth/login  (user login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const passwordMatch = await bcrypt.compare(password, user.hashedP);
    if (!passwordMatch)
      return res.status(401).json({ error: "Incorrect password" });

    // block admin from user login route
    if (user.role === "admin") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userId = user._id.toString();

    res.status(200).json({
      message: "Login successful",
      token,
      name: user.name,
      email,
      role: user.role,
      userId,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
});

// POST /api/auth/admin/login
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const passwordMatch = await bcrypt.compare(password, user.hashedP);
    if (!passwordMatch)
      return res.status(401).json({ error: "Password is incorrect" });

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userId = user._id.toString();

    res.status(200).json({
      token,
      message: "Login successful",
      name: user.name,
      email: user.email,
      role: user.role,
      userId,
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Error during login" });
  }
});

module.exports = router;
