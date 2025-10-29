import express from "express";
import { updateRestaurant } from "../controllers/restaurantController.js";

const router = express.Router();

// ✅ Update restaurant
router.put("/:id", updateRestaurant);

export default router;
