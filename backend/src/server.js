// backend/src/server.js
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

// ✅ Load env vars
dotenv.config();

// ✅ Connect MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// ✅ Start server
const server = app.listen(PORT, () => {
  console.log(
    `🚀 Smart Restaurant Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});

// ✅ Handle rejections & exceptions
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error(`💥 Uncaught Exception: ${err.message}`);
  process.exit(1);
});
