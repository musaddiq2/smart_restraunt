// By Areeb Shaikh
import express from "express";
import {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/OrderController.js";

import { validateRequest } from "../middlewares/validateRequest.js";
import { orderValidationSchema } from "../validations/orderValidation.js";

const router = express.Router();

// 🟢 Place new order (Validation required)
router.post("/", validateRequest(orderValidationSchema), placeOrder);

// 🟡 Get all orders (Admin/Staff)
router.get("/", getAllOrders);

// 🔵 Get single order (Admin/Staff)
router.get("/:orderId", getOrderById);

// 🟠 Update order status (Admin/Customer/Staff)
router.patch("/:orderId/status", updateOrderStatus);

// 🔴 Cancel order
router.delete("/:orderId", cancelOrder);

export default router;
