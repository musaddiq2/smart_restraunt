import express from "express";
import { 
  registerAdmin, 
  getAllAdmins, 
  toggleAdminStatus,
  assignRestaurantToAdmin,
  removeRestaurantFromAdmin,
  updateAdminPermissions,
  getAdminRestaurants
} from "../controllers/authController.js";
import { protect, isSuperAdmin, isRegularAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Get all admins (Super Admin only)
router.get("/", protect, isSuperAdmin, getAllAdmins);

// ✅ Get admin's assigned restaurants (Admin only)
router.get("/my-restaurants", protect, isRegularAdmin, getAdminRestaurants);

// ✅ Only Super Admin can create another admin
router.post("/register-admin", protect, isSuperAdmin, registerAdmin);

// ✅ Toggle admin status (Block/Unblock) (Super Admin only)
router.patch("/:id/status", protect, isSuperAdmin, toggleAdminStatus);

// ✅ Assign restaurant to admin (Super Admin only)
router.post("/assign-restaurant", protect, isSuperAdmin, assignRestaurantToAdmin);

// ✅ Remove restaurant assignment (Super Admin only)
router.delete("/remove-restaurant", protect, isSuperAdmin, removeRestaurantFromAdmin);

// ✅ Update admin permissions (Super Admin only)
router.patch("/:adminId/permissions", protect, isSuperAdmin, updateAdminPermissions);

export default router;
