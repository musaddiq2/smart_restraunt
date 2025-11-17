import express from "express";
import upload from "../middlewares/upload.js";
import {
  addRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/add", upload.single("restaurantImg"), addRestaurant);
router.get("/all", getRestaurants);
router.get("/:id", getRestaurant);
router.put("/update/:id", upload.single("restaurantImg"), updateRestaurant);
router.delete("/delete/:id", deleteRestaurant);

export default router;
