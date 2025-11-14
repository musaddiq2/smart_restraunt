import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/* ==========================================================
   🔐 Helper to generate JWT
   ========================================================== */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* ==========================================================
   🧍‍♂️ Register Normal User
   ========================================================== */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

/* ==========================================================
   🔑 Login User
   ========================================================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Please fill in all fields" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

/* ==========================================================
   👑 Register a New Admin (Admin Only)
   ========================================================== */
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    const token = generateToken(newAdmin._id, newAdmin.role);

    res.status(201).json({
      success: true,
      message: "✅ New admin created successfully",
      admin: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Admin creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
