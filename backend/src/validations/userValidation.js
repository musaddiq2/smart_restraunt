// backend/src/validations/userValidation.js
import Joi from "joi";

// ✅ Registration Validation Schema
export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "staff", "user").default("user"),
});

// ✅ Login Validation Schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
