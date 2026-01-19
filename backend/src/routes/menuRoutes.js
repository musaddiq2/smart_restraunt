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
import {
  checkPermission,
  checkRestaurantSubscription,
} from "../middlewares/checkRestaurantAccess.js";

const router = express.Router();

/**
 * =========================
 * PUBLIC ROUTES
 * =========================
 */
router.get("/", getAllMenuItems);
router.get("/:menuId", getMenuItemById);

/**
 * =========================
 * PROTECTED ROUTES
 * =========================
 * Requires:
 * - Auth
 * - Admin role
 * - Active subscription
 * - Menu management permission
 */
router.post(
  "/",
  protect,
  isAdmin,
  checkRestaurantSubscription,
  checkPermission("canManageMenus"),
  upload.single("image"),
  addMenuItem
);

router.put(
  "/:menuId",
  protect,
  isAdmin,
  checkRestaurantSubscription,
  checkPermission("canManageMenus"),
  upload.single("image"),
  updateMenuItem
);

router.delete(
  "/:menuId",
  protect,
  isAdmin,
  checkRestaurantSubscription,
  checkPermission("canManageMenus"),
  deleteMenuItem
);

export default router;

