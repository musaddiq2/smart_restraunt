// src/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Smart Restaurant Backend API is running...");
});

export default app;
