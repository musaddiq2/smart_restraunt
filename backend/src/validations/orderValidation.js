



import Joi from "joi";

/**
 * =========================
 * ITEM VALIDATION SCHEMA
 * =========================
 */
const itemSchema = Joi.object({
  itemId: Joi.string().required().messages({
    "any.required": "itemId is required",
  }),

  itemName: Joi.string().trim().required().messages({
    "string.empty": "Item name is required",
  }),

  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),
});

/**
 * =========================
 * ORDER VALIDATION SCHEMA
 * =========================
 */
export const orderValidationSchema = Joi.object({
  orderType: Joi.string()
    .valid("DineIn", "Takeaway")
    .required()
    .messages({
      "any.only": "Invalid order type",
      "any.required": "orderType is required",
    }),

  tableNumber: Joi.when("orderType", {
    is: "DineIn",
    then: Joi.string().trim().required().messages({
      "string.empty": "Table number is required for DineIn",
    }),
    otherwise: Joi.string().allow("").optional(),
  }),

  customerName: Joi.string().allow("").optional(),
  customerMobile: Joi.string().allow("").optional(),

  items: Joi.array()
    .items(itemSchema)
    .min(1)
    .required()
    .messages({
      "array.min": "At least one item is required",
    }),

  totalAmount: Joi.number().min(0).required().messages({
    "number.base": "Total amount must be a number",
    "any.required": "Total amount is required",
  }),

  paymentMethod: Joi.string()
    .valid("Cash", "UPI", "Card")
    .required()
    .messages({
      "any.only": "Invalid payment method",
      "any.required": "Payment method is required",
    }),

  notes: Joi.string().allow("", null).optional(),
});
