// backend/src/middlewares/validateRequest.js
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
