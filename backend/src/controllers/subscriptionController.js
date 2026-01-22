import SubscriptionPlan from "../models/SubscriptionManagement.js";
import Restaurant from "../models/restaurantModel.js";
import PaymentHistory from "../models/PaymentHistory.js";
import Invoice from "../models/Invoice.js";
import { generateInvoiceNumber } from "../services/subscriptionService.js";

/* ======================================================
   CREATE SUBSCRIPTION PLAN (ADMIN)
====================================================== */
export const createPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET ALL PLANS
====================================================== */
export const getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find({ isActive: true });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   ASSIGN PLAN TO RESTAURANT (CORE LOGIC)
====================================================== */
export const assignPlanToRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const {
      planId,
      gracePeriodDays,
      paymentMethod,
      transactionId,
    } = req.body;

    // 1️⃣ Check plan exists
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // 2️⃣ Calculate subscription dates
    const startDate = new Date();
    const expiryDate = new Date(startDate);

    if (plan.duration === "MONTHLY") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    // 3️⃣ Update restaurant subscription
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        subscription: {
          planId,
          startDate,
          expiryDate,
          gracePeriodDays: gracePeriodDays || 3,
          status: "ACTIVE",
        },
      },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // 4️⃣ Save payment history
    const payment = await PaymentHistory.create({
      restaurantId,
      planId,
      amount: plan.price,
      paymentMethod,
      transactionId,
    });

    // 5️⃣ Create invoice record (PDF generation later)
    const invoice = await Invoice.create({
      invoiceNumber: generateInvoiceNumber(),
      restaurantId,
      paymentId: payment._id,
      planId,
      amount: plan.price,
      tax: 0,
      totalAmount: plan.price,
      invoicePdfUrl: "PENDING",
    });

    res.json({
      message: "Plan assigned successfully",
      subscription: restaurant.subscription,
      payment,
      invoice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET RESTAURANT SUBSCRIPTION
====================================================== */
export const getRestaurantSubscription = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId)
      .populate("subscription.planId");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant.subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET PAYMENT HISTORY
====================================================== */
export const getPaymentHistory = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const payments = await PaymentHistory.find({ restaurantId })
      .sort({ paidAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET INVOICE BY PAYMENT ID
====================================================== */
export const getInvoiceByPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const invoice = await Invoice.findOne({ paymentId });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
