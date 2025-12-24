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
    setNotes,
    subtotal,
    total,
  } = useCart();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
       <button onClick={() => navigate(-1)} style={{position:"absolute",top:16,left:16,fontSize:24,background:"transparent",border:"none",cursor:"pointer"}}>←</button>


        <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center tracking-wide">
          🛒 Your Cart
        </h2>

        {/* Order Type */}
        <div className="mb-8">
          
          <label className="block mb-2 font-semibold text-yellow-300">Order Type</label>
          <select
            value={cart.orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1e293b] border border-yellow-500 text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="DINE_IN">Dine In</option>
            <option value="TAKEAWAY">Takeaway</option>
          </select>
        </div>












{/* Customer Details (Common for both) */}
<div className="mb-8 bg-[#1e293b] p-4 rounded-lg shadow-md border border-yellow-500 space-y-4">
  <div>
    <label className="block mb-1 font-semibold text-yellow-300">
      Customer Name
    </label>
    <input
      type="text"
      value={cart.customer.name}
      onChange={(e) => setCustomer("name", e.target.value)}
      className="w-full p-3 rounded-lg bg-[#0f172a] border border-yellow-400 text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      placeholder="Enter your name"
    />
  </div>

  <div>
    <label className="block mb-1 font-semibold text-yellow-300">
      Phone Number
    </label>
    <input
      type="tel"
      value={cart.customer.phone}
      onChange={(e) => setCustomer("phone", e.target.value)}
      className="w-full p-3 rounded-lg bg-[#0f172a] border border-yellow-400 text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      placeholder="Enter phone number"
    />
  </div>

  {/* Show ONLY for DINE-IN */}
  {cart.orderType === "DINE_IN" && (
    <div>
      <label className="block mb-1 font-semibold text-yellow-300">
        Table Number
      </label>
      <input
        type="text"
        value={cart.tableId || ""}
        onChange={(e) => setTable(e.target.value)}
        className="w-full p-3 rounded-lg bg-[#0f172a] border border-yellow-400 text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder="e.g. T5"
      />
    </div>
  )}
</div>













      

        {/* Cart Items */}
        {cart.items.length === 0 ? (
          <p className="text-gray-400 text-center py-16 text-lg">Your cart is empty</p>
        ) : (
          <div className="space-y-4 mb-8">
            {cart.items.map((item) => (
              <div
                key={item.itemId}
                className="flex items-center justify-between p-4 bg-[#1e293b] rounded-lg shadow-md border border-yellow-500 hover:bg-[#273449] transition duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-yellow-400 text-lg">{item.itemName}</p>
                    <p className="text-yellow-300 font-bold">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.itemId, item.quantity - 1)}
                    className="px-3 py-1 bg-yellow-500 text-[#0f172a] font-bold rounded hover:bg-yellow-400 transition"
                  >
                    −
                  </button>
                  <span className="text-yellow-200 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.itemId, item.quantity + 1)}
                    className="px-3 py-1 bg-yellow-500 text-[#0f172a] font-bold rounded hover:bg-yellow-400 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.itemId)}
                    className="text-red-500 font-bold hover:text-red-400 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notes */}
        <div className="mb-8 bg-[#1e293b] p-4 rounded-lg shadow-md border border-yellow-500">
          <label className="block mb-1 font-semibold text-yellow-300">Notes (Optional)</label>
          <textarea
            value={cart.notes || ""}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0f172a] border border-yellow-400 text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Any special instructions..."
            rows={3}
          />
        </div>

        {/* Totals */}
        <div className="mb-8 bg-[#1e293b] p-4 rounded-lg shadow-md border border-yellow-500 space-y-2">
          <div className="flex justify-between text-yellow-200 font-medium">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-yellow-200 font-medium">
            <span>Packing Fee</span>
            <span>₹{cart.charges.packingFee}</span>
          </div>
          <div className="flex justify-between text-yellow-400 font-bold text-lg border-t border-yellow-500 pt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={() => navigate("/checkout")}
          className="w-full py-3 bg-yellow-500 text-[#0f172a] font-bold rounded-lg hover:bg-yellow-400 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

