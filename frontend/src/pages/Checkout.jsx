import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Checkout() {
  const {
    cart,
    subtotal,
    total,
    clearCart,
    setCustomer,
    setNotes,
    setTable,
  } = useCart();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ---------------- VALIDATION ----------------
  const validateOrder = () => {
    if (!cart.items || cart.items.length === 0) {
      toast.error("Cart is empty");
      return false;
    }

    if (cart.orderType === "DINE_IN" && !cart.tableId) {
      toast.error("Table number is required for Dine-in");
      return false;
    }

    if (!cart.customer.name || !cart.customer.phone) {
      toast.error("Customer name & phone are required");
      return false;
    }

    return true;
  };

  // ---------------- PLACE ORDER ----------------
  const placeOrder = async () => {
    if (!validateOrder()) return;

    const payload = {
      orderType: cart.orderType === "DINE_IN" ? "DineIn" : "Takeaway",

      tableNumber:
        cart.orderType === "DINE_IN" ? cart.tableId : "",

      customerName: cart.customer.name,
      customerMobile: cart.customer.phone,

      items: cart.items.map((item) => ({
        itemId: item.itemId || item._id,
        itemName: item.itemName || item.name,
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),

      totalAmount: Number(total),

      paymentMethod: "Cash",
      notes: cart.notes || "",
    };

    console.log("✅ FINAL PAYLOAD:", payload);

    try {
      setLoading(true);

    const API_BASE = import.meta.env.VITE_API_URL;
const res = await axios.post(`${API_BASE}/orders`, payload);


      toast.success("Order placed successfully 🎉");
      clearCart();
      navigate(`/order-success/${res.data.order._id}`);
    } catch (error) {
      console.error("🔥 BACKEND ERROR:", error);

      // Safe error handling
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err));
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontSize: 24,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ←
        </button>

        <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          🛒 Checkout
        </h2>

        {/* ORDER TYPE */}
        <div className="mb-6">
          <label className="block mb-1 text-yellow-300 font-semibold">
            Order Type
          </label>
          <input
            readOnly
            value={cart.orderType === "DINE_IN" ? "Dine In" : "Takeaway"}
            className="w-full p-3 bg-[#1e293b] border border-yellow-500 rounded-lg"
          />
        </div>

        {/* CUSTOMER */}
        <div className="mb-6 bg-[#1e293b] p-4 rounded-lg border border-yellow-500 space-y-4">
          {cart.orderType === "DINE_IN" && (
            <div>
              <label className="block text-yellow-300">Table Number</label>
              <input
                value={cart.tableId || ""}
                onChange={(e) => setTable(e.target.value)}
                className="w-full p-3 bg-[#0f172a] border border-yellow-400 rounded-lg"
              />
            </div>
          )}

          <div>
            <label className="block text-yellow-300">Customer Name</label>
            <input
              value={cart.customer.name}
              onChange={(e) => setCustomer("name", e.target.value)}
              className="w-full p-3 bg-[#0f172a] border border-yellow-400 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-yellow-300">Phone</label>
            <input
              value={cart.customer.phone}
              onChange={(e) => setCustomer("phone", e.target.value)}
              className="w-full p-3 bg-[#0f172a] border border-yellow-400 rounded-lg"
            />
          </div>
        </div>

        {/* ITEMS */}
        <div className="space-y-4 mb-6">
          {cart.items.map((item) => (
            <div
              key={item.itemId || item._id}
              className="flex justify-between bg-[#1e293b] p-4 rounded-lg border border-yellow-500"
            >
              <div>
                <p className="text-yellow-400 font-bold">{item.itemName}</p>
                <p className="text-yellow-200">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* NOTES */}
        <textarea
          value={cart.notes || ""}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full mb-6 p-3 bg-[#0f172a] border border-yellow-400 rounded-lg"
          placeholder="Any instructions..."
        />

        {/* TOTAL */}
        <div className="mb-6 bg-[#1e293b] p-4 rounded-lg border border-yellow-500">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between font-bold text-yellow-400 mt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* PLACE ORDER */}
        <button
          onClick={placeOrder}
          disabled={loading}
          className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
