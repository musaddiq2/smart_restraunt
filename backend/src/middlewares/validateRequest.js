


// ✅ YOUR ORIGINAL CODE (NOT TOUCHED)

export const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.details.map((d) => d.message),
    });
  }
};


// --------------------------------------------
// ⭐ NEW CODE (EXPRESS-VALIDATOR VERSION)
// (ADDED WITHOUT TOUCHING YOUR ORIGINAL CODE)
// --------------------------------------------
import { body, validationResult } from "express-validator";

export const validateCreateCategory = [
  body("mainCategory")
    .exists({ checkFalsy: true })
    .withMessage("mainCategory is required")
    .isString()
    .withMessage("mainCategory must be a string")
    .trim()
    .isLength({ min: 1 }),

  body("subCategory")
    .exists({ checkFalsy: true })
    .withMessage("subCategory is required")
    .isString()
    .withMessage("subCategory must be a string")
    .trim()
    .isLength({ min: 1 }),

  body("type")
    .exists({ checkFalsy: true })
    .withMessage("type is required")
    .isString()
    .withMessage("type must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({
        success: false,
        errors: errors.array(),
      });
    next();
  },
];

export const validateUpdateCategory = [
  body("mainCategory")
    .optional()
    .isString()
    .withMessage("mainCategory must be a string")
    .trim()
    .isLength({ min: 1 }),

  body("subCategory")
    .optional()
    .isString()
    .withMessage("subCategory must be a string")
    .trim()
    .isLength({ min: 1 }),

  body("type")
    .optional()
    .isString()
    .withMessage("type must be a string"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({
        success: false,
        errors: errors.array(),
      });
    next();
  },
];
