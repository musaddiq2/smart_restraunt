
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelAllowed, setCancelAllowed] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(5); // Start at 5 seconds
  const [canceling, setCanceling] = useState(false);

  // Fetch order details once on mount
  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${API_BASE}/orders/${orderId}`);
      if (res.data.success) {
        setOrder(res.data.order);
        setCancelAllowed(res.data.cancelAllowed);
        // If backend sends remainingSeconds, use it; otherwise default to 5
        setRemainingSeconds(res.data.remainingSeconds || 5);
      }
    } catch (err) {
      toast.error("Order not found");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch + polling for status updates
  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  // Local countdown timer (only when cancel is allowed)
  useEffect(() => {
    if (!cancelAllowed || remainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cancelAllowed, remainingSeconds]);

  const handleCancel = async () => {
    try {
      setCanceling(true);
      const res = await axios.delete(`${API_BASE}/orders/${orderId}`);
      if (res.data.success) {
        toast.success("Order cancelled");
        fetchOrder();
      }
    } catch {
      toast.error("Cancel failed");
    } finally {
      setCanceling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const statusUI = {
    Pending: { text: "Order Pending", color: "text-yellow-400", icon: "⏳" },
    Preparing: { text: "Preparing Food", color: "text-blue-400", icon: "👨‍🍳" },
    Completed: { text: "Order Completed", color: "text-green-400", icon: "✅" },
    Cancelled: { text: "Order Cancelled", color: "text-red-400", icon: "❌" },
  };

  const current = statusUI[order?.status] || statusUI.Pending;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl p-8 border border-yellow-500 shadow-2xl">
        {/* Header / Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="text-4xl font-bold text-yellow-400">Smart</div>
          <div className="ml-2 text-xl">Restaurant</div>
        </div>

        {/* Success Card */}
        <div className="bg-[#0f172a] rounded-xl p-6 text-center mb-6">
          {/* Big Checkmark */}
          <div className="mx-auto w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-yellow-400 mb-2">
            Order Successful
          </h1>
          <p className="text-gray-400 mb-4">
            Order ID: <span className="font-mono">{orderId}</span>
          </p>

          {/* Timer & Cancel Section */}
          {cancelAllowed && remainingSeconds > 0 ? (
            <div className="mt-4">
              <p className="text-red-400 font-medium mb-3">
                Cancel available for{" "}
                <span className="font-bold text-red-300">{remainingSeconds}s</span>
              </p>

              {/* Animated Progress Bar */}
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-red-600 transition-all duration-1000 ease-linear"
                  style={{
                    width: `${(remainingSeconds / 5) * 100}%`,
                  }}
                />
              </div>

              <button
                onClick={handleCancel}
                disabled={canceling}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${
                  canceling
                    ? "bg-red-800 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {canceling ? "Cancelling..." : "Cancel Order"}
              </button>
            </div>
          ) : (
            /* Order Status after timer */
            <div className="mt-6 animate-pulse-soft">
              <div className={`text-6xl mb-4 ${current.color}`}>
                {current.icon}
              </div>
              <p className={`text-xl font-bold ${current.color}`}>
                {current.text}
              </p>
            </div>
          )}
        </div>

        {/* Return to Menu Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Return to Menu
        </button>
      </div>

      {/* Custom animation */}
      <style>{`
        .animate-pulse-soft {
          animation: pulseSoft 2s infinite ease-in-out;
        }
        @keyframes pulseSoft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}




