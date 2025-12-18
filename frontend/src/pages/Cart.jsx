import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    updateQty,
    removeItem,
    setOrderType,
    setTable,
    setCustomer,
    setNotes, // ✅ Add this
    subtotal,
    total,
  } = useCart();

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-[#1E3A8A] text-center">
        Your Cart
      </h2>

      {/* Order Type */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">
          Order Type
        </label>
        <select
          value={cart.orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm"
        >
          <option value="DINE_IN">Dine In</option>
          <option value="TAKEAWAY">Takeaway</option>
        </select>
      </div>

      {/* DINE-IN */}
      {cart.orderType === "DINE_IN" && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <label className="block mb-1 font-medium">Table Number</label>
          <input
            type="text"
            value={cart.tableId || ""}
            onChange={(e) => setTable(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. T5"
          />
        </div>
      )}

      {/* TAKEAWAY */}
      {cart.orderType === "TAKEAWAY" && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow space-y-4">
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

      {/* Items */}
      {cart.items.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.itemId}
              className="flex justify-between items-center p-4 bg-[#1F2937] text-white rounded-lg shadow"
            >
              <div>
                <p className="font-semibold text-lg">{item.itemName}</p>
                <p className="text-gray-300">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.itemId, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQty(item.itemId, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.itemId)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <label className="block mb-1 font-medium">Notes (Optional)</label>
        <textarea
          value={cart.notes || ""}
          onChange={(e) => setNotes(e.target.value)} // ✅ FIXED
          className="w-full p-2 border rounded"
          placeholder="Any special instructions..."
          rows={3}
        />
      </div>

      {/* Totals */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Packing Fee</span>
          <span>₹{cart.charges.packingFee}</span>
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-2 text-[#1E3A8A]">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Proceed to Checkout */}
      <button
        onClick={() => navigate("/checkout")}
        className="w-full mt-6 bg-[#1E3A8A] text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
