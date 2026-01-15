import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import "./cron/subscriptionCron.js";


// ✅ Load environment variables first
dotenv.config();

// ✅ Connect to Database
connectDB();

// ✅ PORT now comes from .env with fallback
const PORT = process.env.PORT || 5000;

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
