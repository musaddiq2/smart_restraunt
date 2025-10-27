import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: String,
  image: String, // optional image URL or path
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

// ✅ Correct default export (important for ESM)
export default MenuItem;
