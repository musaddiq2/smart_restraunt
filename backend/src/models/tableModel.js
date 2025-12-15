import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableNumber: { type: Number, required: true, unique: true },
    seats: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Available", "Booked", "Occupied"],
      default: "Available",
    },

    // ⭐ NEW — For dynamic linking with restaurant
    restaurantId: {
      type: String, // restaurantId from Restaurant model
      default: null,
    },

    restaurantName: {
      type: String, // Auto-filled from restaurant controller
      default: null,
    },

    qrCode: {
      type: String, // Data URL or hosted URL
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Table", tableSchema);
