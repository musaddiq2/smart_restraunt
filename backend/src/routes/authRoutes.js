// backend/src/routes/authRoutes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { registerSchema, loginSchema } from "../validations/userValidation.js";

const router = express.Router();

// ✅ Register route
router.post("/register", validateRequest(registerSchema), registerUser);

// ✅ Login route
router.post("/login", validateRequest(loginSchema), loginUser);

export default router;
