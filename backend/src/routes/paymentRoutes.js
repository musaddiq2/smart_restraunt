import express from "express";
import { createOnlinePayment } from "../controllers/paymentController.js";

const router = express.Router();

/* =========================
   ONLINE PAYMENT
========================= */
router.post("/create-order", createOnlinePayment);

export default router;
