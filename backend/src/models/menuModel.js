// models/menuModel.js
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  available: { type: Boolean, default: true },
});

const menuSchema = new mongoose.Schema({
  name: { type: String, default: "Main Menu" },
  items: [menuItemSchema],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Menu", menuSchema);
