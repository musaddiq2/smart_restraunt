// By Arib Shaikh
// src/controllers/OrderController.js

import Order from "../models/OrderModel.js";
import { orderValidationSchema } from "../validations/orderValidation.js";

/* ======================================================
   HELPER: CALCULATE TOTAL AMOUNT
   items: [{ itemName, quantity, price }]
====================================================== */
const calcTotal = (items = []) => {
  return items.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );
};

/* ======================================================
   CREATE / PLACE ORDER (Customer)
   POST /api/v1/orders
====================================================== */
export const placeOrder = async (req, res) => {
  try {
    // Joi validation
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

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("🔥 Error placing order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ======================================================
   GET ALL ORDERS (Admin / Staff)
   GET /api/v1/orders
====================================================== */
export const getAllOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

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

/* ======================================================
   GET SINGLE ORDER
   GET /api/v1/orders/:id
====================================================== */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   UPDATE ORDER STATUS (Kitchen / Admin)
   PATCH /api/v1/orders/:id/status
====================================================== */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

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

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   CANCEL ORDER (Customer)
   DELETE /api/v1/orders/:id
====================================================== */
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Cannot cancel completed orders
    if (order.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Completed order cannot be cancelled",
      });
    }

    order.status = "Cancelled";
    order.cancelReason = req.body.reason || "Cancelled by user";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
