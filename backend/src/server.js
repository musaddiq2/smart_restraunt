import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ⭐ Correct CORS for credentials + formData
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// ⭐ Make uploads folder public
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Smart Restaurant API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
