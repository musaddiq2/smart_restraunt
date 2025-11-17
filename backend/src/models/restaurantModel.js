import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Veg", "Non-Veg", "Veg & Non-Veg"],
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    openingTime: {
      type: String,
      required: true,
    },

    closingTime: {
      type: String,
      required: true,
    },

    restaurantImg: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
