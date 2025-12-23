// backend/src/models/adminRestaurantModel.js
import mongoose from "mongoose";

const adminRestaurantSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Super Admin who assigned this
    },
  },
  { timestamps: true }
);

// Ensure one admin can't be assigned to the same restaurant twice
adminRestaurantSchema.index({ adminId: 1, restaurantId: 1 }, { unique: true });

export default mongoose.model("AdminRestaurant", adminRestaurantSchema);

