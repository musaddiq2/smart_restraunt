import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: false }, // optional ref
  itemName: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
});

const orderSchema = new mongoose.Schema(
  {
    tableNumber: { type: String, default: "" },
    items: { type: [itemSchema], default: [] },
    totalAmount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Completed"],
      default: "Pending",
    },
    customerName: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
                                    