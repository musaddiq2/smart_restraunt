
import express from "express";
import Category from "../models/categoryModel.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { categoryValidationSchema } from "../validations/categoryValidation.js";

const router = express.Router();

// CREATE Category
router.post(
  "/",
  validateRequest(categoryValidationSchema),
  async (req, res, next) => {
    try {
      const { mainCategory, subCategory, type, isActive } = req.body;

      // Create and save category (awaited properly)
      const category = new Category({ mainCategory, subCategory, type, isActive });
      await category.save();

      // Send response
      res.status(201).json({ success: true, category });
    } catch (error) {
      next(error);
    }
  }
);

// GET All Categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find(); // fetch from MongoDB
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
});

// UPDATE Category by ID
router.put(
  "/:id",
  validateRequest(categoryValidationSchema),
  async (req, res, next) => {
    try {
      const { mainCategory, subCategory, type, isActive } = req.body;
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { mainCategory, subCategory, type, isActive },
        { new: true }
      );
      if (!category)
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      res.json({ success: true, category });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE Category by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
