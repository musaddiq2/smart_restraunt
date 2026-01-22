import mongoose from "mongoose";
import Order from "../models/OrderModel.js"; // ✅ NEW: Import Order model for controller use

/* =========================
   ITEM SCHEMA
========================= */
const itemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: false, // ✅ NEW: Made optional to avoid crashes
  },
  itemName: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
});

/* =========================
   ORDER SCHEMA
========================= */
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
      enum: ["Pending", "Preparing", "Completed", "Cancelled"], // ✅ NEW: Added "Cancelled"
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card",null],
      default: "null",
    },

    paymentStatus: {
      type: String,
      // enum: ["Unpaid", "Paid"],
      enum :  ["Pending", "Paid", "Failed"],
      default: "Pending",

    },

    transactionId: {
  type: String,
  default: null,
},

  
    notes: { type: String, default: "" },
  },

  
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

/* =========================
   CANCEL ORDER CONTROLLER
========================= */
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ NEW: ObjectId validation (prevents server crash)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const order = await Order.findById(id);

    // ✅ NEW: Order existence check
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ✅ NEW: Prevent cancelling completed orders
    if (order.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Completed order cannot be cancelled",
      });
    }

    // ✅ NEW: Safe status update
    order.status = "Cancelled";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });

  } catch (error) {
    console.error("❌ Cancel order error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
