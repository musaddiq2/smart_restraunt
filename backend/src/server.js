// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// // ROUTES
// import menuRoutes from "./routes/menuRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import userRoutes from "./routes/userRoutes.js"; // make sure filename is lowercase: userRoutes.js

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // Parse JSON bodies

// // Base route for quick API test
// app.get("/", (req, res) => {
//   res.send("🍽️ Hotel QR Menu API is running...");
// });

// // API routes
// // API routes
// app.use("/api/v1/menu", menuRoutes);
// app.use("/api/v1/orders", orderRoutes);
// app.use("/api/v1/users", userRoutes);


// // Handle unknown routes
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: "Route not found" });
// });

// // Global error handler (optional but useful)
// app.use((err, req, res, next) => {
//   console.error("Server Error:", err.stack);
//   res.status(500).json({ success: false, message: "Server error" });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
// src/server.js
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
