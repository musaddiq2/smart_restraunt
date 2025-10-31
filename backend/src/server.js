import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js"; // ✅ default import (no curly braces)

// Load environment variables
dotenv.config();

// Port from .env or default
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});
