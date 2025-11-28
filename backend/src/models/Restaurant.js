import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  restaurantId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  type: { type: String, required: true },
  address: { type: String, required: true },
  openingTime: { type: String },
  closingTime: { type: String },
  restaurantImg: { type: String },
}, { timestamps: true });

export default mongoose.model("Restaurant", restaurantSchema);
