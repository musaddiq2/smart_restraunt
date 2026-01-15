import express from "express";
import upload from "../config/multer.js";
import {
  addMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/checkRestaurantAccess.js";

const router = express.Router();

// Public routes - anyone can view menus
router.get("/", getAllMenuItems);
router.get("/:menuId", getMenuItemById);

// Protected routes - require admin access and menu management permission
router.post("/", protect, isAdmin, checkPermission("canManageMenus"), upload.single("image"), addMenuItem);
router.put("/:menuId", protect, isAdmin, checkPermission("canManageMenus"), upload.single("image"), updateMenuItem);
router.delete("/:menuId", protect, isAdmin, checkPermission("canManageMenus"), deleteMenuItem);

export default router;

