import express from "express";
const router = express.Router();
import User from "../models/User.js"; // make sure User.js exists in models

// Test route
router.get("/", (req, res) => {
  res.send("User route works");
});

// Example POST route (register user)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ success: true, message: "User registered", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
