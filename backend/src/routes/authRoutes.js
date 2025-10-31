import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { registerSchema, loginSchema } from "../validations/userValidation.js";

const router = express.Router();

// ✅ Register route with validation
router.post("/register", validateRequest(registerSchema), registerUser);

// ✅ Login route with validation
router.post("/login", validateRequest(loginSchema), loginUser);

export default router;
