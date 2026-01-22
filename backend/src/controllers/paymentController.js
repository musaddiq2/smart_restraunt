



// import Order from "../models/OrderModel.js";
// import razorpay from "../config/razorpay.js";
// import mongoose from "mongoose";
// import crypto from "crypto";

// /* ======================================================
//    CREATE ONLINE PAYMENT (RAZORPAY ORDER)
// ====================================================== */
// export const createOnlinePayment = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     // 1️⃣ Validate Order ID
//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order ID",
//       });
//     }

//     // 2️⃣ Fetch Order
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // 3️⃣ Prevent duplicate payments
//     if (order.paymentStatus === "Paid") {
//       return res.status(400).json({
//         success: false,
//         message: "Order already paid",
//       });
//     }

//     // 4️⃣ Create Razorpay Order
//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(order.totalAmount * 100), // INR → paise
//       currency: "INR",
//       receipt: `order_${order._id}`,
//       notes: {
//         orderId: order._id.toString(),
//         customer: order.customerName || "Guest",
//       },
//     });

//     // 5️⃣ Update Order with Razorpay order ID
//     order.transactionId = razorpayOrder.id;
//     order.paymentStatus = "Pending";
//     order.paymentMethod = "ONLINE";
//     await order.save();

//     // 6️⃣ Send response to frontend
//     res.status(200).json({
//       success: true,
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       key: process.env.RAZORPAY_KEY_ID, // ✅ Public key only
//       orderId: order._id,
//     });

//   } catch (error) {
//     console.error("❌ Razorpay order creation error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Payment initiation failed",
//     });
//   }
// };

// /* ======================================================
//    VERIFY ONLINE PAYMENT
// ====================================================== */
// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId,
//     } = req.body;

//     // 1️⃣ Validate Order ID
//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order ID",
//       });
//     }

//     // 2️⃣ Fetch Order
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // 3️⃣ Verify Signature
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       await Order.findByIdAndUpdate(orderId, {
//         paymentStatus: "Failed",
//       });

//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }

//     // 4️⃣ Mark Payment as Successful
//     order.paymentStatus = "Paid";
//     order.paymentId = razorpay_payment_id;
//     order.transactionId = razorpay_order_id;
//     order.paymentMethod = "ONLINE";
//     order.isPaid = true;
//     order.paidAt = new Date();

//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//       orderId: order._id,
//     });

//   } catch (error) {
//     console.error("❌ Payment verification error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Payment verification failed",
//     });
//   }
// };





// src/controllers/paymentController.js

import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

export const createOnlinePayment = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    if (
      !process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      console.error("❌ Razorpay keys missing");
      return res.status(500).json({
        success: false,
        message: "Payment configuration error",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // rupees → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("❌ Razorpay create order error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Razorpay error",
    });
  }
};
