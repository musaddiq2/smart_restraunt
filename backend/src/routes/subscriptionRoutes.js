import express from "express";
import {
  createPlan,
  getAllPlans,
  assignPlanToRestaurant,
  getRestaurantSubscription,
  getPaymentHistory,
  getInvoiceByPayment,
} from "../controllers/subscriptionController.js";

import { protect } from "../middlewares/authMiddleware.js";
import {
  checkRestaurantPermission,
  checkRestaurantSubscription,
} from "../middlewares/checkRestaurantAccess.js";

const router = express.Router();

/* ======================================================
   PLAN MANAGEMENT (ADMIN / SUPER ADMIN)
====================================================== */

// Create a subscription plan
router.post("/plans", protect, createPlan);

// Get all subscription plans
router.get("/plans", protect, getAllPlans);

/* ======================================================
   ASSIGN PLAN TO RESTAURANT (SUPER ADMIN)
====================================================== */

// Assign plan to a restaurant
router.post("/assign/:restaurantId", protect, assignPlanToRestaurant);

/* ======================================================
   RESTAURANT SUBSCRIPTION
====================================================== */

// Get current subscription of a restaurant
router.get(
  "/restaurant/:restaurantId",
  protect,
  checkRestaurantPermission,
  checkRestaurantSubscription,
  getRestaurantSubscription
);

/* ======================================================
   PAYMENTS & INVOICES
====================================================== */

// Get payment history of a restaurant
router.get(
  "/payments/:restaurantId",
  protect,
  checkRestaurantPermission,
  checkRestaurantSubscription,
  getPaymentHistory
);

// Get invoice using payment ID
router.get("/invoice/:paymentId", protect, getInvoiceByPayment);

export default router;
