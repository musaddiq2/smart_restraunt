import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    phone: String,
    email: String,
    rating: {
      type: Number,
      default: 0,
    },
    cuisine: String,
    priceRange: Number,
    description: String,
    isOpen: {
      type: Boolean,
      default: true,
    },

    // 👇 New field added
    serviceStyle: {
      type: String,
      enum: [
        "Fast Food / QSR",
        "Fast Casual",
        "Casual Dining",
        "Fine Dining",
        "Family Style",
      ],
      default: "Casual Dining",
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
