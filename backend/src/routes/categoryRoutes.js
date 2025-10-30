import express from "express";
import Category from "../models/categoryModel.js";

const router = express.Router();

// CREATE Category
router.post("/", async (req, res) => {
  try {
    const { mainCategory, subCategory, type, isActive } = req.body;
    const category = new Category({ mainCategory, subCategory, type, isActive });
    await category.save();
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET All Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE Category by ID
router.put("/:id", async (req, res) => {
  try {
    const { mainCategory, subCategory, type, isActive } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { mainCategory, subCategory, type, isActive },
      { new: true }
    );
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE Category by ID
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
