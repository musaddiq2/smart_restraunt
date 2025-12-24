


import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: false,
  },
  itemName: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
});

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, default: "" },
    customerMobile: { type: String, default: "" },
    tableNumber: { type: String, default: "" },

    orderType: {
      type: String,
      enum: ["DineIn", "Takeaway"],
      default: "DineIn",
    },

    items: { type: [itemSchema], required: true },
    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Pending", "Preparing", "Completed", "Cancelled"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card"],
      default: "Cash",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },

    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
