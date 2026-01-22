


// import http from "http";
// import dotenv from "dotenv";

// // 🔥 Load env as FIRST step
// dotenv.config();

// import app from "./app.js";
// import connectDB from "./config/db.js";

// // Connect to MongoDB
// connectDB();

// // Create HTTP server
// const server = http.createServer(app);

// // Initialize Socket.IO
// initSocket(server);

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


import http from "http";
import dotenv from "dotenv";

// 🔥 Load env as FIRST step
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { initSocket } from "./socket.js"; // ✅ FIXED IMPORT

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
