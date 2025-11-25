import express from "express";
import {
  getAllRestaurants,
  addRestaurant,
  editRestaurant,
  deleteRestaurant,
  getRestaurantByRestaurantId,   // ⭐ NEW
  getRestaurantById               // ⭐ NEW
} from "../controllers/restaurantController.js";

import upload from "../config/multer.js";

const router = express.Router();

// ---------------- RESTAURANT ROUTES ----------------

// GET ALL restaurants
router.get("/", getAllRestaurants);

// ⭐ NEW — Get restaurant using restaurantId (used by TableList auto-fill)
router.get("/find/:restaurantId", getRestaurantByRestaurantId);

// ⭐ Optional — Get restaurant by MongoDB _id
router.get("/:id", getRestaurantById);

// ADD RESTAURANT
router.post("/add", upload.single("restaurantImg"), addRestaurant);

// EDIT RESTAURANT
router.put("/:id", upload.single("restaurantImg"), editRestaurant);

// DELETE RESTAURANT
router.delete("/:id", deleteRestaurant);

export default router;
