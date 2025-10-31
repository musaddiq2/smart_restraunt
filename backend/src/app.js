// src/app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// ✅ Import Routes
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

// ✅ Import Global Error Handler
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

// ✅ Initialize app
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ✅ Base Route
app.get("/", (req, res) => {
  res.send("🍽️ Smart Restaurant API is running...");
});

// ✅ API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/menus", menuRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/users", userRoutes);

// ✅ 404 Route Handler (For Unknown Routes)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ✅ Global Error Handler (Catches all other errors)
app.use(errorHandler);

export default app;
