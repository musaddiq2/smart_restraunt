import express from "express";
import {
  getAllRestaurants,
  addRestaurant,
  editRestaurant,
  deleteRestaurant,
  getRestaurantByRestaurantId,
  getRestaurantById
} from "../controllers/restaurantController.js";
import { protect, isSuperAdmin } from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

/* -----------------------------------------
   RESTAURANT ROUTES (ORDER IS IMPORTANT)
------------------------------------------*/

// 1️⃣ Get ALL restaurants
router.get("/", getAllRestaurants);

// 2️⃣ Get by restaurantId (string-based)
router.get("/find/:restaurantId", getRestaurantByRestaurantId);

// 3️⃣ Get by MongoDB _id (always keep this LAST)
router.get("/:id", getRestaurantById);

// 4️⃣ Add restaurant (Super Admin only - uses image 'restaurantImg')
router.post("/add", protect, isSuperAdmin, upload.single("restaurantImg"), addRestaurant);

// 5️⃣ Edit restaurant (Super Admin only - image optional)
router.put("/:id", protect, isSuperAdmin, upload.single("restaurantImg"), editRestaurant);

// 6️⃣ Delete restaurant (Super Admin only)
router.delete("/:id", protect, isSuperAdmin, deleteRestaurant);

export default router;
