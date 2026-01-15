import { Server } from "socket.io";

let io = null;

/**
 * Initialize Socket.IO with HTTP server
 * Must be called ONCE from server.js
 */
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Frontend URL (Vite)
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    // Example: listen for admin/kitchen/client events if needed later
    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });

  return io;
};

/**
 * Get initialized Socket.IO instance
 * Safe to use in controllers
 */
export const getIO = () => {
  if (!io) {
    throw new Error(
      "❌ Socket.io not initialized. Call initSocket(server) first."
    );
  }
  return io;
};
