


import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  /* ====================== HELPERS ====================== */

  const updateQty = (itemId, newQty) => {
    if (newQty < 1) return;

    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.itemId === itemId
          ? { ...item, quantity: newQty }
          : item
      ),
    }));
  };

  const removeItem = (itemId) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.itemId !== itemId),
    }));
  };

  const setOrderType = (value) => {
    setCart((prev) => ({
      ...prev,
      orderType: value,
      tableId: value === "TAKEAWAY" ? "" : prev.tableId,
    }));
  };

  const setTable = (value) => {
    setCart((prev) => ({ ...prev, tableId: value }));
  };

  const setCustomer = (field, value) => {
    setCart((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value,
      },
    }));
  };

  const setNotes = (value) => {
    setCart((prev) => ({ ...prev, notes: value }));
  };

  /* ====================== TOTALS ====================== */

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const packingFee = cart.charges?.packingFee || 0;
  const total = subtotal + packingFee;

  /* ====================== VALIDATION ====================== */

  const handleCheckout = () => {
    if (!cart.items || cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const name = cart.customer.name?.trim();
    const phone = cart.customer.phone?.trim();
    const table = cart.tableId?.trim();

    if (!name) {
      toast.error("Customer name is required");
      return;
    }

    if (!/^[A-Za-z ]{2,}$/.test(name)) {
      toast.error("Enter a valid customer name");
      return;
    }

    if (!phone) {
      toast.error("Phone number is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    if (cart.orderType === "DINE_IN" && !table) {
      toast.error("Table number is required for Dine In");
      return;
    }

    navigate("/checkout");
  };

  /* ====================== UI ====================== */

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto mt-4 md:mt-8">

        <div className="flex items-center justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-yellow-400 hover:text-yellow-300 transition text-xl"
          >
            <FaChevronLeft />
          </button>

          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">
            🛒 Your Cart
          </h2>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-yellow-300">
            Order Type
          </label>
          <select
            value={cart.orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1e293b] border border-yellow-500 text-yellow-200"
          >
            <option value="DINE_IN">Dine In</option>
            <option value="TAKEAWAY">Takeaway</option>
          </select>
        </div>

        <div className="mb-6 bg-[#1e293b] p-4 rounded-lg border border-yellow-500 space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-yellow-300">
              Customer Name *
            </label>
            <input
              type="text"
              value={cart.customer.name}
              onChange={(e) =>
                setCustomer(
                  "name",
                  e.target.value.replace(/[^A-Za-z ]/g, "")
                )
              }
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-yellow-400 text-yellow-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-yellow-300">
              Phone Number *
            </label>
            <input
              type="tel"
              maxLength={10}
              value={cart.customer.phone}
              onChange={(e) =>
                setCustomer("phone", e.target.value.replace(/\D/g, ""))
              }
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-yellow-400 text-yellow-200"
            />
          </div>

          {cart.orderType === "DINE_IN" && (
            <div>
              <label className="block mb-1 font-semibold text-yellow-300">
                Table Number *
              </label>
              <input
                type="text"
                value={cart.tableId || ""}
                onChange={(e) => setTable(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#0f172a] border border-yellow-400 text-yellow-200"
              />
            </div>
          )}
        </div>

        {cart.items.length === 0 ? (
          <p className="text-gray-400 text-center py-16 text-lg">
            Your cart is empty
          </p>
        ) : (
          <div className="space-y-4 mb-6">
            {cart.items.map((item) => (
              <div
                key={item.itemId}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#1e293b] rounded-lg border border-yellow-500"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-yellow-400">
                      {item.itemName}
                    </p>
                    <p className="text-yellow-300 font-bold">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => updateQty(item.itemId, item.quantity - 1)}
                    className="px-3 py-1 bg-yellow-500 text-[#0f172a] font-bold rounded"
                  >
                    −
                  </button>

                  <span className="text-yellow-200">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQty(item.itemId, item.quantity + 1)}
                    className="px-3 py-1 bg-yellow-500 text-[#0f172a] font-bold rounded"
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

        <div className="mb-6 bg-[#1e293b] p-4 rounded-lg border border-yellow-500">
          <label className="block mb-1 font-semibold text-yellow-300">
            Notes (Optional)
          </label>
          <textarea
            value={cart.notes || ""}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0f172a] border border-yellow-400 text-yellow-200"
            rows={3}
          />
        </div>

        <div className="mb-6 bg-[#1e293b] p-4 rounded-lg border border-yellow-500">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Packing Fee</span>
            <span>₹{packingFee}</span>
          </div>
          <div className="flex justify-between font-bold text-yellow-400 text-lg border-t border-yellow-500 pt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-yellow-500 text-[#0f172a] font-bold rounded-lg hover:bg-yellow-400"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
