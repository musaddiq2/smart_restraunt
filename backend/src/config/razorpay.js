import Razorpay from "razorpay";
import dotenv from "dotenv";

// 🔹 Load env first
dotenv.config();

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

if (!key_id || !key_secret) {
  console.error("❌ Razorpay keys are missing in .env!");
  throw new Error("Razorpay keys not found in environment variables");
}

const razorpay = new Razorpay({
  key_id,
  key_secret,
});

console.log("✅ Razorpay initialized"); // debug
export default razorpay;
