import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Basic, Pro, Enterprise
  },

  duration: {
    type: String,
    enum: ["MONTHLY", "YEARLY"],
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  features: {
    maxTables: { type: Number, required: true },
    maxOrdersPerDay: { type: Number, required: true },
    analyticsAccess: { type: Boolean, default: false }
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

export default mongoose.model("SubscriptionPlan", planSchema);
