// import express from "express";
// import Order from "../models/Order.js"; // make sure this file exists
// const router = express.Router();

// // ✅ Example: Get all orders
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ✅ Example: Create a new order
// router.post("/", async (req, res) => {
//   try {
//     const newOrder = new Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// export default router;

//By arib shaikh

import express from "express";
import {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/OrderController.js";

const router = express.Router();

// Place new order
router.post("/", placeOrder);

// Get all orders (Admin/Staff)
router.get("/", getAllOrders);

// Get single order (Admin/Staff)
router.get("/:orderId", getOrderById);

// Update order status (Admin/Customer/Staff)
router.patch("/:orderId/status", updateOrderStatus);


// Cancel order
router.delete("/:orderId", cancelOrder);

export default router;



