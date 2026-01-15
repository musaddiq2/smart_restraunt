import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import socket from "../../../socket"; // adjust path if needed

const API_URL = "http://localhost:5000/api/v1"; // Correct API base

const STATUS_META = {
  Pending: { text: "Order Pending", color: "text-yellow-400", icon: "⏳" },
  Preparing: { text: "Preparing Food", color: "text-blue-400", icon: "👨‍🍳" },
  Completed: { text: "Order Completed", color: "text-green-400", icon: "✅" },
  Cancelled: { text: "Order Cancelled", color: "text-red-400", icon: "❌" },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [connected, setConnected] = useState(false);

  // ===================== INITIAL LOAD =====================
  useEffect(() => {
    fetchOrders();

    // Socket.IO connection
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    // 📦 New order from client
    socket.on("newOrder", (order) => {
      setOrders((prev) => [order, ...prev]);
    });

    // 🔄 Order updated from admin/kitchen
    socket.on("orderUpdated", (updated) => {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === updated.orderId ? { ...o, status: updated.status } : o
        )
      );
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("newOrder");
      socket.off("orderUpdated");
    };
  }, []);

  // ===================== FETCH ORDERS =====================
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`);
      if (res.data && res.data.orders) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  // ===================== STATUS UPDATE =====================
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/orders/${id}/status`, { status });
      // Optimistic UI update
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  // ===================== FILTER COUNTS =====================
  const counts = useMemo(() => {
    const base = { All: orders.length };
    Object.keys(STATUS_META).forEach((s) => {
      base[s] = orders.filter((o) => o.status === s).length;
    });
    return base;
  }, [orders]);

  // ===================== FILTERED ORDERS =====================
  const visibleOrders = useMemo(() => {
    if (filter === "All") return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  // ===================== UI =====================
  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📦 Order Management</h1>
        <span className={`text-sm ${connected ? "text-green-400" : "text-red-400"}`}>
          {connected ? "🟢 Live Connected" : "🔴 Disconnected"}
        </span>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["All", ...Object.keys(STATUS_META)].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full border transition ${
              filter === s
                ? "bg-yellow-500 text-black"
                : "border-gray-700 text-gray-300 hover:bg-gray-800"
            }`}
          >
            {s} ({counts[s] || 0})
          </button>
        ))}
      </div>

      {/* ORDERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleOrders.map((order) => {
          const meta = STATUS_META[order.status] || {};
          const customerName = order.customer?.name || order.customerName || "Guest";
          const customerPhone = order.customer?.phone || order.customerMobile || "N/A";
          const isDineIn = order.orderType.toLowerCase().includes("dine");

          return (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-gray-900 rounded-2xl shadow-lg p-4 space-y-3">
                {/* HEADER */}
                <div className="flex justify-between">
                  <span className="font-semibold">#{order._id.slice(-6)}</span>
                  <span className={`${meta.color} font-medium`}>
                    {meta.icon} {meta.text}
                  </span>
                </div>

                {/* CUSTOMER INFO */}
                <p className="text-sm text-gray-400">
                  Customer: <span className="font-semibold">{customerName}</span> | 
                  Phone: <span className="font-semibold">{customerPhone}</span>
                  {isDineIn && (
                    <> | Table: <span className="font-semibold">{order.tableNumber || "-"}</span></>
                  )}
                </p>

                {/* ORDER ITEMS */}
                <div className="text-sm space-y-1">
                  {order.items.map((i, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{i.itemName} × {i.quantity}</span>
                      <span>₹{i.price}</span>
                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>

                {/* PAYMENT INFO */}
                <div className="text-xs text-gray-400">
                  Payment: {order.paymentMethod} ({order.paymentStatus})
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 pt-3 flex-wrap">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(order._id, "Preparing")}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                    >
                      Start Preparing
                    </button>
                  )}

                  {order.status === "Preparing" && (
                    <button
                      onClick={() => updateStatus(order._id, "Completed")}
                      className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700"
                    >
                      Mark Completed
                    </button>
                  )}

                  {order.status !== "Completed" && order.status !== "Cancelled" && (
                    <button
                      onClick={() => updateStatus(order._id, "Cancelled")}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
