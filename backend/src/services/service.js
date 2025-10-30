import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import restaurantRoutes from "./routes/restaurantRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/restaurants", restaurantRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Smart Restaurant API is running...");
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "smart_restaurant" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Failed:", err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
