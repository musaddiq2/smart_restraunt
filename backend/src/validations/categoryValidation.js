import Joi from "joi";

export const categoryValidationSchema = Joi.object({
  mainCategory: Joi.string().trim().required().messages({
    "string.empty": "Main category is required",
    "any.required": "Main category is required",
  }),
  subCategory: Joi.string().trim().required().messages({
    "string.empty": "Sub category is required",
    "any.required": "Sub category is required",
  }),
  type: Joi.string().trim().required().messages({
    "string.empty": "Type is required",
    "any.required": "Type is required",
  }),
  isActive: Joi.boolean().optional(),
});
