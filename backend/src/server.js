import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Connect to Database
connectDB();
dotenv.config();

// ✅ PORT now comes from .env with fallback
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
