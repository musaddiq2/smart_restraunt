import Joi from "joi";

const itemSchema = Joi.object({
  itemId: Joi.string().optional().allow(null, ""), // optional reference
  itemName: Joi.string().trim().required().messages({
    "string.empty": "Item name is required",
    "any.required": "Item name is required",
  }),
  quantity: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
  }),
  price: Joi.number().min(0).default(0).messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
  }),
});

export const orderValidationSchema = Joi.object({
  tableNumber: Joi.string().trim().optional().allow(""),
  items: Joi.array().items(itemSchema).min(1).required().messages({
    "array.base": "Items must be an array",
    "array.min": "At least one item is required",
    "any.required": "Items are required",
  }),
  totalAmount: Joi.number().min(0).required().messages({
    "number.base": "Total amount must be a number",
    "any.required": "Total amount is required",
  }),
  status: Joi.string()
    .valid("Pending", "Preparing", "Completed")
    .optional()
    .default("Pending"),
  customerName: Joi.string().trim().optional().allow(""),
  notes: Joi.string().trim().optional().allow(""),
});
