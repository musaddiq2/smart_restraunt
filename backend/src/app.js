// src/app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

// ✅ Initialize app
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ✅ API Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/menus", menuRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/users", userRoutes);
// Test route
app.get("/", (req, res) => res.send("🍽️ Smart Restaurant API is running..."));

// ✅ 404 Route Handler (For Unknown Routes)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});
app.use(errorHandler);

export default app;
