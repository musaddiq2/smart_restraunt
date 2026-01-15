import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["RAZORPAY", "UPI", "CASH", "CARD", "NETBANKING"],
      required: true,
    },

    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    paidAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PaymentHistory", paymentSchema);
