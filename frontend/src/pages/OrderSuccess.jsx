import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // ⏱ 600 seconds


 
  const API_BASE = import.meta.env.VITE_API_URL;

// Fetch order details
const fetchOrder = async () => {
  try {
    const res = await axios.get(`${API_BASE}/orders/${orderId}`);
    if (res.data.success) {
      setOrder(res.data.order);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchOrder();

  // Countdown timer
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [orderId]);

// Cancel order
const handleCancelOrder = async () => {
  if (!window.confirm("Are you sure you want to cancel this order?")) return;

  try {
    setCanceling(true);
    const res = await axios.delete(`${API_BASE}/orders/${orderId}`);

    if (res.data.success) {
      navigate("/");
    }
  } catch (err) {
    console.error(err);
  } finally {
    setCanceling(false);
  }
};


  if (loading) {
    return <p className="text-center mt-10">Loading order details...</p>;
  }

  if (!order) {
    return (
      <p className="text-center mt-10 text-red-600">
        Order not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">

      {/* ⬅ Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-2xl font-bold"
      >
        ←
      </button>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">

        <h1 className="text-2xl font-bold text-green-600 mb-2">
          ✅ Order Placed Successfully
        </h1>

        <p className="text-gray-700 mb-1">
          Order ID: <span className="font-semibold">{order._id}</span>
        </p>

        <p className="text-gray-600 mb-4">
          Status: <span className="font-medium">{order.status}</span>
        </p>

        {/* Timer */}
        {timeLeft > 0 ? (
          <p className="text-sm text-red-500 mb-4">
            You can cancel this order in {timeLeft}s
          </p>
        ) : (
          <p className="text-sm text-gray-400 mb-4">
            Cancellation time expired
          </p>
        )}

        <div className="flex flex-col gap-3">

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Menu
          </button>

          {timeLeft > 0 && (
            <button
              onClick={handleCancelOrder}
              disabled={canceling}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {canceling ? "Cancelling..." : "Cancel Order"}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
