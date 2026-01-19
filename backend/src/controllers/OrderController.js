
import mongoose from "mongoose";
import Order from "../models/OrderModel.js";
import { orderValidationSchema } from "../validations/orderValidation.js";
import { getIO } from "../utils/socket.js";

// ====================== HELPERS ======================
const calcTotal = (items = []) =>
  items.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

const emitSocketEvent = (event, payload) => {
  try {
    const io = getIO();
    io.emit(event, payload);
  } catch (err) {
    console.warn("⚠️ Socket.io not initialized yet");
  }
};

// ====================== PLACE ORDER ======================
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
      tableNumber,
      items,
      customerName,
      customerMobile,
      orderType,
      notes,
      paymentMethod,
    } = value;

    const totalAmount = calcTotal(items);

    if (totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total amount must be greater than zero",
      });
    }

    const order = await Order.create({
      tableNumber: tableNumber || "",
      customerName: customerName || "",
      customerMobile: customerMobile || "",
      orderType: orderType || "DineIn",
      items,
      totalAmount,
      notes: notes || "",
      status: "Pending",
      paymentMethod: paymentMethod || "Cash",
      paymentStatus: "Unpaid",
    });

    emitSocketEvent("newOrder", order);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ====================== GET ALL ORDERS ======================
export const getAllOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================== GET ORDER BY ID ======================
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
      order.paymentStatus === "Unpaid" &&
      remainingSeconds > 0;

    res.status(200).json({
      success: true,
      order,
      cancelAllowed,
      remainingSeconds,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================== UPDATE ORDER STATUS ======================
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

    order.status = status;
    await order.save();

    emitSocketEvent("orderUpdated", {
      orderId: order._id,
      status: order.status,
    });

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================== CANCEL ORDER ======================
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

    if (order.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled",
      });
    }

    order.status = "Cancelled";
    await order.save();

    emitSocketEvent("orderUpdated", {
      orderId: order._id,
      status: "Cancelled",
    });

    res.status(200).json({
      success: true,
      message: "Order cancelled",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

























