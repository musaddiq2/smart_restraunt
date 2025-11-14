import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { registerUser, loginUser, registerAdmin } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ==========================
   🧍‍♀️ USER AUTH ROUTES
   ========================== */
router.post("/register", registerUser);
router.post("/login", loginUser);

/* ==========================
   👑 ADMIN REGISTRATION ROUTE
   ========================== */
// Option 1: Uses controller (clean & recommended)
router.post("/register-admin", protect, authorizeRoles("admin"), registerAdmin);

// ✅ Option 2 (inline version if you want it in this file directly)
router.post("/register-admin-inline", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      name,
      email,
      password: hashed,
      role: "admin",
    });

    res.status(201).json({
      success: true,
      message: "✅ New admin created successfully",
      user: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
