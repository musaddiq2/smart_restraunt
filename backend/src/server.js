<<<<<<< HEAD
import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Connect to Database
connectDB();
dotenv.config();
=======
// ✅ Added dotenv, cors, and custom DB connection
import express from "express";
import dotenv from "dotenv";          // NEW: load environment variables
import cors from "cors";              // NEW: enable CORS
import connectDB from "./config/db.js"; // NEW: custom DB connection function

// ✅ Added new route imports
import authRoutes from "./routes/authRoutes.js";          // NEW
import categoryRoutes from "./routes/categoryRoutes.js";  // NEW
import restaurantRoutes from "./routes/restaurantRoutes.js"; // NEw
import menuRoutes from "./routes/menuRoutes.js"; // ✅ correct path

dotenv.config();   // NEW: initialize dotenv
connectDB();       // NEW: connect to MongoDB via custom function

const app = express();

// ⭐ Correct CORS for credentials + formData
// ✅ Replaced default express setup with proper CORS config
app.use(
  cors({
    origin: "http://localhost:5173",   // NEW: allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // NEW: allowed methods
    credentials: true,                 // NEW: allow cookies/credentials
  })
);

// ✅ Body parser remains same
app.use(express.json());

// ⭐ Make uploads folder public
app.use("/uploads", express.static("uploads"));

// ✅ Updated routes (added auth, categories, restaurants)
app.use("/api/v1/auth", authRoutes);             // NEW
app.use("/api/v1/categories", categoryRoutes);   // NEW
app.use("/api/v1/restaurants", restaurantRoutes);// NEW
app.use("/api/v1/menus", menuRoutes);

// ✅ Added default route
app.get("/", (req, res) => {
  res.send("🚀 Smart Restaurant API Running...");
});
>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63

// ✅ PORT now comes from .env with fallback
const PORT = process.env.PORT || 5000;
<<<<<<< HEAD

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
=======
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
