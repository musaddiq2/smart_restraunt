import express from "express";
import cors from "cors";
import restaurantRoutes from "./routes/restaurantRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/restaurants", restaurantRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
