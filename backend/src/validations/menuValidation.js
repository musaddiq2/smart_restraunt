// src/validations/menuValidation.js
import Joi from "joi";


export const menuItemSchema = Joi.object({
name: Joi.string().trim().min(1).required(),
price: Joi.number().precision(2).min(0).required(),
category: Joi.string().hex().length(24).required(), // assuming Mongo _id
description: Joi.string().allow("").optional(),
available: Joi.boolean().optional(),
});