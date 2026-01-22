

import express from "express";
import {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  payCashOrder,
} from "../controllers/OrderController.js";

import { validateRequest } from "../middlewares/validateRequest.js";
import { orderValidationSchema } from "../validations/orderValidation.js";

const router = express.Router();

/* =========================
   PLACE ORDER
========================= */
router.post(
  "/",
  validateRequest(orderValidationSchema),
  placeOrder
);

/* =========================
   GET ORDERS
========================= */
router.get("/", getAllOrders);
router.get("/:id", getOrderById);

/* =========================
   ORDER STATUS
========================= */
router.patch("/:id/status", updateOrderStatus);
router.put("/:id/status", updateOrderStatus);

/* =========================
   PAYMENT ROUTES
========================= */
// ✅ CASH PAYMENT (FIXED)
router.post("/:id/pay-cash", payCashOrder);

// ✅ ONLINE PAYMENT UPDATE (OPTIONAL / FUTURE USE)
router.patch("/:id/payment", updatePaymentStatus);

/* =========================
   CANCEL
========================= */
router.delete("/:id", cancelOrder);

export default router;
