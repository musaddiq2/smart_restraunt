// src/middlewares/validateRequest.js
export const validateRequest = (schema) => (req, res, next) => {
const options = { abortEarly: false, allowUnknown: false };
const { error, value } = schema.validate(req.body, options);
if (error) {
// collect all messages
const messages = error.details.map((d) => d.message).join(", ");
return res.status(400).json({ success: false, message: messages });
}
// replace body with validated/coerced value (helps types like numbers)
req.body = value;
next();
};