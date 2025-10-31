// src/validations/restaurantValidation.js
import Joi from "joi";


export const restaurantSchema = Joi.object({
name: Joi.string().trim().min(3).max(100).required().messages({
"string.empty": "name is required",
"string.min": "name must be at least 3 characters",
}),
address: Joi.string().trim().min(10).required().messages({
"string.empty": "address is required",
}),
phone: Joi.string()
.pattern(/^[0-9]{10}$/)
.required()
.messages({ "string.pattern.base": "phone must be 10 digits" }),
serviceStyle: Joi.string()
.valid("Fast Food", "Dine In", "Take Away")
.required(),
rating: Joi.number().min(0).max(5).optional(),
});