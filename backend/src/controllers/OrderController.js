




import mongoose from "mongoose";
import Order from "../models/OrderModel.js";
import { orderValidationSchema } from "../validations/orderValidation.js";
import { getIO } from "../utils/socket.js";

/* =========================
   HELPERS
========================= */
const calcTotal = (items = []) => {
  return items.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.quantity || 1);
    return sum + price * qty;
  }, 0);
};

const emitSocketEvent = (event, payload) => {
  try {
    const io = getIO();
    io.emit(event, payload);
  } catch (err) {
    console.warn("⚠️ Socket.io not initialized yet");
  }
};

/* =========================
   PLACE ORDER
========================= */
export const placeOrder = async (req, res) => {
  try {
    const { error, value } = orderValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((e) => e.message),
      });
    }

    const {
      customerName,
      customerMobile,
      tableNumber,
      orderType,
      items,
      notes,
      paymentMethod,
    } = value;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    const totalAmount = calcTotal(items);

    if (totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total amount must be greater than zero",
      });
    }

    const order = await Order.create({
      customerName: customerName || "",
      customerMobile: customerMobile || "",
      tableNumber: tableNumber || "",
      orderType: orderType || "DineIn",
      items,
      totalAmount,
      notes: notes || "",
      status: "Pending",
      paymentMethod: paymentMethod || null,
      paymentStatus: "Pending",
      transactionId: null,
    });

    emitSocketEvent("newOrder", order);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Place order error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   GET ALL ORDERS
========================= */
export const getAllOrders = async (req, res) => {
  try {
    const filter = {};

    if (req.query.status) filter.status = req.query.status;
    if (req.query.paymentStatus)
      filter.paymentStatus = req.query.paymentStatus;

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("❌ Get all orders error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ORDER BY ID
========================= */
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    /* ===== Cancel Window Logic ===== */
    const CANCEL_WINDOW_SECONDS = 5;
    const createdAt = new Date(order.createdAt).getTime();
    const now = Date.now();
    const diffSeconds = Math.floor((now - createdAt) / 1000);

    const remainingSeconds = Math.max(
      0,
      CANCEL_WINDOW_SECONDS - diffSeconds
    );

    const cancelAllowed =
      order.status === "Pending" &&
      order.paymentStatus === "Pending" &&
      remainingSeconds > 0;

    return res.status(200).json({
      success: true,
      order,
      cancelAllowed,
      remainingSeconds,
    });
  } catch (error) {
    console.error("❌ Get order error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   UPDATE ORDER STATUS
========================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const validStatuses = [
      "Pending",
      "Preparing",
      "Completed",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${validStatuses.join(", ")}`,
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ❌ Prevent changing status after cancellation
    if (order.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled order cannot be updated",
      });
    }

    order.status = status;
    await order.save();

    emitSocketEvent("orderUpdated", {
      orderId: order._id,
      status: order.status,
    });

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Update status error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   UPDATE PAYMENT STATUS
========================= */
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, paymentMethod, transactionId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const validPaymentStatuses = ["Pending", "Paid", "Failed"];

    if (!validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = paymentStatus;
    order.paymentMethod = paymentMethod || order.paymentMethod;
    order.transactionId = transactionId || null;

    await order.save();

    emitSocketEvent("paymentUpdated", {
      orderId: order._id,
      paymentStatus: order.paymentStatus,
    });

    return res.status(200).json({
      success: true,
      message: "Payment status updated",
      order,
    });
  } catch (error) {
    console.error("❌ Payment update error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   CANCEL ORDER
========================= */
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Completed order cannot be cancelled",
      });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order already cancelled",
      });
    }

    order.status = "Cancelled";
    await order.save();

    emitSocketEvent("orderUpdated", {
      orderId: order._id,
      status: "Cancelled",
    });

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

/* =========================
   PAY CASH
========================= */
export const payCashOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.paymentStatus === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Order already paid",
      });
    }

    order.paymentMethod = "Cash";
    order.paymentStatus = "Paid";
    order.transactionId = "CASH-" + Date.now();

    await order.save();

    emitSocketEvent("paymentUpdated", {
      orderId: order._id,
      paymentStatus: "Paid",
    });

    return res.status(200).json({
      success: true,
      message: "Cash payment successful",
      order,
    });
  } catch (error) {
    console.error("❌ Cash payment error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};









