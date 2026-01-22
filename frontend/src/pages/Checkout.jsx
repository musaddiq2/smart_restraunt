





import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cart, setCart } = useCart(); // ❌ removed clearCart
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /* =========================
     LOCAL STATE
  ========================= */
  const [customerName, setCustomerName] = useState(cart.customer?.name || "");
  const [customerPhone, setCustomerPhone] = useState(cart.customer?.phone || "");
  const [tableNumber, setTableNumber] = useState(cart.tableId || "");
  const [notes, setNotes] = useState(cart.notes || "");

  /* =========================
     CALCULATE TOTALS
  ========================= */
  const localSubtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const packingFee = cart.charges?.packingFee || 0;
  const localTotal = localSubtotal + packingFee;

  /* =========================
     VALIDATION
  ========================= */
  const validateOrder = () => {
    if (!cart.items || cart.items.length === 0) {
      toast.error("Cart is empty");
      return false;
    }

    if (cart.orderType === "DINE_IN" && !tableNumber.trim()) {
      toast.error("Table number is required for Dine-in");
      return false;
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error("Customer name & phone are required");
      return false;
    }

    if (!/^[A-Za-z ]{2,}$/.test(customerName.trim())) {
      toast.error("Enter a valid customer name");
      return false;
    }

    if (!/^[0-9]{10}$/.test(customerPhone.trim())) {
      toast.error("Phone number must be 10 digits");
      return false;
    }

    if (!localTotal || isNaN(localTotal)) {
      toast.error("Total amount is invalid");
      return false;
    }

    return true;
  };

  /* =========================
     PLACE ORDER
  ========================= */
  const placeOrder = async () => {
    if (!validateOrder()) return;

    const items = cart.items.map((item) => ({
      itemId: String(item.itemId || item._id),
      itemName: item.itemName || item.name,
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

    const payload = {
      orderType: cart.orderType === "DINE_IN" ? "DineIn" : "Takeaway",
      tableNumber: cart.orderType === "DINE_IN" ? tableNumber.trim() : "",
      customerName: customerName.trim(),
      customerMobile: customerPhone.trim(),
      items,
      paymentMethod: "Cash",
      notes: notes.trim(),
    };

    try {
      setLoading(true);
      const API_BASE = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${API_BASE}/orders`, payload);

      toast.success("Order placed successfully 🎉");

      /* =========================
         RESET CART (FIXED)
      ========================= */
      setCart({
        items: [],
        customer: { name: "", phone: "" },
        orderType: "",
        tableId: "",
        notes: "",
        charges: {},
      });

      navigate(`/order-success/${res.data.order._id}`);
    } catch (error) {
      console.error("Order placement error:", error);

      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) =>
          toast.error(err)
        );
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CART UPDATE HELPERS
  ========================= */
  const handleSetCustomer = (field, value) => {
    setCart((prev) => ({
      ...prev,
      customer: { ...prev.customer, [field]: value },
    }));

    if (field === "name") setCustomerName(value);
    if (field === "phone") setCustomerPhone(value);
  };

  const handleSetTable = (value) => {
    setCart((prev) => ({ ...prev, tableId: value }));
    setTableNumber(value);
  };

  const handleSetNotes = (value) => {
    setCart((prev) => ({ ...prev, notes: value }));
    setNotes(value);
  };

  /* =========================
     UI (UNCHANGED)
  ========================= */
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto mt-4 md:mt-8">

        <div className="flex items-center justify-center relative mb-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-yellow-400 hover:text-yellow-300 transition text-xl"
          >
            <FaChevronLeft />
          </button>

          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">
            🛒 Checkout
          </h2>
        </div>

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
                value={tableNumber}
                onChange={(e) => handleSetTable(e.target.value)}
                className="w-full p-3 bg-[#0f172a] border border-yellow-400 rounded-lg"
              />
            </div>
          )}

          <div>
            <label className="block text-yellow-300">Customer Name</label>
            <input
              value={customerName}
              onChange={(e) => handleSetCustomer("name", e.target.value)}
              className="w-full p-3 bg-[#0f172a] border border-yellow-400 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-yellow-300">Phone</label>
            <input
              value={customerPhone}
              onChange={(e) => handleSetCustomer("phone", e.target.value)}
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
                <p className="text-yellow-400 font-bold">
                  {item.itemName || item.name}
                </p>
                <p className="text-yellow-200">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* NOTES */}
        <textarea
          value={notes}
          onChange={(e) => handleSetNotes(e.target.value)}
          className="w-full mb-6 p-3 bg-[#0f172a] border border-yellow-400 rounded-lg"
          placeholder="Any instructions..."
        />

        {/* TOTAL */}
        <div className="mb-6 bg-[#1e293b] p-4 rounded-lg border border-yellow-500">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{localSubtotal}</span>
          </div>

          {packingFee > 0 && (
            <div className="flex justify-between">
              <span>Packing Fee</span>
              <span>₹{packingFee}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-yellow-400 mt-2">
            <span>Total</span>
            <span>₹{localTotal}</span>
          </div>
        </div>

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
