
// models/MenuItem.js
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  available: { type: Boolean, default: true },

  // ⭐ ADD THIS (Important)
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

export default mongoose.model("MenuItem", menuItemSchema);
