import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    restaurantId: {
      type: String,
      unique: true,
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
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
