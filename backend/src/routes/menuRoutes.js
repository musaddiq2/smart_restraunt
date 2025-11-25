import express from "express";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

// GET all menu items
router.get("/", async (req, res) => {
  try {
    const menu = await MenuItem.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single menu item by ID
router.get("/:menuId", async (req, res) => {
  try {
    const menu = await MenuItem.findById(req.params.menuId);
    if (!menu) return res.status(404).json({ message: "Menu item not found" });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new menu item
router.post("/", async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update menu item by ID
router.put("/:menuId", async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(
      req.params.menuId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Menu item not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE menu item by ID
router.delete("/:menuId", async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.menuId);
    if (!deleted) return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
