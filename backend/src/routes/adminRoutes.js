import express from "express";
import { registerAdmin } from "../controllers/authController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Only admins can create another admin
router.post("/register-admin", protect, isAdmin, registerAdmin);

export default router;
