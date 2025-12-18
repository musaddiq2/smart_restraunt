import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";

// Middleware
import { errorHandler } from "./middlewares/errorHandler.js";

// Initialize dotenv
dotenv.config();

// Initialize app
const app = express();

// ✅ Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ⭐ Make uploads folder public
app.use("/uploads", express.static("uploads"));


// ✅ API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/menus", menuRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tables", tableRoutes);

// ✅ Test Route
app.get("/", (req, res) => res.send("🍽️ Smart Restaurant API is running..."));

// ✅ 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ✅ Global Error Handler
app.use(errorHandler);

export default app;
