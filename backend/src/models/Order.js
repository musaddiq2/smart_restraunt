import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  tableNumber: Number,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: "pending",
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
