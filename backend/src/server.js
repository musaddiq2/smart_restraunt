import dotenv from "dotenv";
<<<<<<< HEAD
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Smart Restaurant API Running on port ${PORT}`);
=======
import app from "./app.js";
import connectDB from "./config/db.js";

// ✅ Load environment variables first
dotenv.config();

// ✅ Connect to Database
connectDB();

// ✅ PORT now comes from .env with fallback
const PORT = process.env.PORT || 5000;

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
>>>>>>> ceb071b784df9ecba6a675cee78975bfde35ff0b
});
