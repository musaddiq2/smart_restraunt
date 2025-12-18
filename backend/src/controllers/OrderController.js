

// By arib shaikh

import Order from "../models/OrderModel.js";

/**
 * Helper to compute total amount from items
 * items: [{ itemName, quantity, price }]
 */
const calcTotal = (items = []) => {
  return items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 1), 0);
};

// POST /api/v1/orders  — place a new order (Customer)
// POST /api/v1/orders  — place a new order (Customer)
export const placeOrder = async (req, res) => {
  try {
    const { tableNumber, items, customerName, notes } = req.body; // ✅ include notes

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must include items" });
    }

    const totalAmount = calcTotal(items);

    // Create new order with notes
    const order = new Order({
      tableNumber: tableNumber || "",
      customerName: customerName || "",
      items,
      totalAmount,
      notes: notes || "", // ✅ save notes
      status: "Pending", // initial
    });

    await order.save();

    // Optional: emit socket event for new order here if using socket.io

    res.status(201).json({ success: true, message: "Order placed", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// GET /api/v1/orders  — list all orders (Admin/Staff)
export const getAllOrders = async (req, res) => {
  try {
    // Optional: add query filters like ?status=Pending
    const q = {};
    if (req.query.status) q.status = req.query.status;
    const orders = await Order.find(q).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/v1/orders/:orderId — single order (Admin/Staff)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟠 Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Preparing", "Completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${validStatuses.join(", ")}`
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/orders/:orderId  — cancel order (Admin allowed; optionally allow customer if not prepared)
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    // Optional rule: disallow cancel if status is Completed
    if (order.status === "Completed") {
      return res.status(400).json({ success: false, message: "Cannot cancel a completed order" });
    }

    await Order.findByIdAndDelete(req.params.orderId);
    // TODO: emit socket event for cancellation
    res.json({ success: true, message: "Order cancelled" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
