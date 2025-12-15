import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    restaurantId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Veg", "Non-Veg", "Both"],
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    openingTime: {
      type: String,
      required: true,
    },

    closingTime: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: false,   // optional to avoid breaking old DB
      trim: true,
    },

    email: {
      type: String,
      required: false,   // optional to avoid breaking old DB
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    restaurantImg: {
      type: String, // Cloudinary URL
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
