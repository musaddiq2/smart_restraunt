import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);

  // Fetch order details
  const fetchOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/orders/${orderId}`);
      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();

    // Poll every 10 seconds for status update
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [orderId]);

  // Check if order can be canceled (within 5 minutes & pending)
  const canCancel = order
    ? order.status === "Pending" &&
      (new Date() - new Date(order.createdAt)) / 1000 / 60 < 5
    : false;

  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setCanceling(true);
      const res = await axios.delete(`http://localhost:5000/api/v1/orders/${orderId}`);
      if (res.data.success) {
        alert("Order canceled successfully!");
        navigate("/"); // redirect to menu/home
      } else {
        alert(res.data.message || "Failed to cancel order.");
      }
    } catch (err) {
      console.error(err);
      alert("Error canceling order.");
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
        Order not found or has been removed.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600 mb-3">
        ✅ Order Placed Successfully
      </h1>
      <p className="text-lg mb-2">
        Order ID: <span className="font-semibold">{order._id}</span>
      </p>
      <p className="text-gray-700 mb-4">Status: {order.status}</p>
      {order.notes && (
        <p className="mb-4 text-gray-600">
          Notes: <span className="italic">{order.notes}</span>
        </p>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return to Menu
        </button>

        {canCancel && (
          <button
            onClick={handleCancelOrder}
            disabled={canceling}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {canceling ? "Cancelling..." : "Cancel Order"}
          </button>
        )}
      </div>
    </div>
  );
}
