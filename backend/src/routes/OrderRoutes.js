// By Areeb Shaikh
// src/routes/OrderRoutes.js

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

router.post(
  "/",
  validateRequest(orderValidationSchema),
  placeOrder
);


router.get("/", getAllOrders);


router.get("/:id", getOrderById);


router.patch("/:id/status", updateOrderStatus);


router.delete("/:id", cancelOrder);
router.put("/:id/status", updateOrderStatus);


export default router;
