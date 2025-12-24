import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const {
    cart,
    subtotal,
    total,
    clearCart,
    setCustomer,
    setNotes,
  } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ---------------- Validation ----------------
  const validateOrder = () => {
    if (cart.items.length === 0) {
      alert("Cart is empty");
      return false;
    }

    if (cart.orderType === "DINE_IN") {
      if (!cart.tableId) {
        alert("Table number is required for Dine-in orders.");
        return false;
      }
    }

    if (cart.orderType === "TAKEAWAY") {
      if (!cart.customer.name || !cart.customer.phone) {
        alert(
          "Customer name and phone number are required for Takeaway orders."
        );
        return false;
      }
    }

    return true;
  };

  // ---------------- Place Order ----------------
  const placeOrder = async () => {
    if (!validateOrder()) return;

    const orderPayload = {
      tableNumber: cart.orderType === "DINE_IN" ? cart.tableId || "" : "",
      customerName: cart.orderType === "TAKEAWAY" ? cart.customer.name || "" : "",
      items: cart.items.map((i) => ({
        itemId: i.itemId || null,
        itemName: i.itemName || i.name || "",
        quantity: i.quantity || 1,
        price: i.price || 0,
      })),
      totalAmount: total || 0,
      notes: cart.notes || "",
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/orders",
        orderPayload
      );

      if (response.data && response.data.success) {
        alert("Order placed successfully!");
        clearCart();
        navigate(`/order-success/${response.data.order._id}`);
      } else {
        alert("Something went wrong while placing your order.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please check your inputs or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-[#1E3A8A] text-center">
        Checkout
      </h2>

      {/* ---------------- Order Info ---------------- */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="font-medium">Order Type: {cart.orderType}</p>

        {/* Dine-in Table Number */}
        {cart.orderType === "DINE_IN" && (
          <div className="mt-2">
            <label className="block mb-1 font-medium">Table Number</label>
            <input
              type="text"
              value={cart.tableId || ""}
              onChange={(e) => setCustomer("tableId", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g. T5"
            />
          </div>
        )}

        {/* Takeaway Customer Info */}
        {cart.orderType === "TAKEAWAY" && (
          <div className="mt-2 space-y-2">
            <div>
              <label className="block mb-1 font-medium">Customer Name</label>
              <input
                type="text"
                value={cart.customer.name}
                onChange={(e) => setCustomer("name", e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                value={cart.customer.phone}
                onChange={(e) => setCustomer("phone", e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        )}
      </div>

      {/* ---------------- Items ---------------- */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        {cart.items.map((item) => (
          <div
            key={item.itemId}
            className="flex justify-between mb-2 items-center"
          >
            <span>
              {item.itemName || item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <div className="border-t pt-2 mt-2 font-bold flex justify-between">
          <span>Total Amount</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* ---------------- Notes ---------------- */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <label className="block mb-1 font-medium">Notes (Optional)</label>
        <textarea
          value={cart.notes || ""}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Any special instructions..."
          rows={3}
        />
      </div>

      {/* ---------------- Place Order Button --------------bfgg-- */}
      <button
        onClick={placeOrder}
        disabled={loading}
        className="w-full bg-[#1E3A8A] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
