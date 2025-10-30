import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Category API
app.use("/api/categories", categoryRoutes);

// Test route
app.get("/", (req, res) => res.send("🍽️ Smart Restaurant API is running..."));
import restaurantRoutes from "./routes/restaurantRoutes.js";


// Routes
app.use("/api/v1/restaurants", restaurantRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
