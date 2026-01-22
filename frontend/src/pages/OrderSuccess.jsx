


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
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const [canceling, setCanceling] = useState(false);
  const [paying, setPaying] = useState(false);

  /* ================= LOAD RAZORPAY SCRIPT ================= */
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /* ================= FETCH ORDER ================= */
  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${API_BASE}/orders/${orderId}`);
      if (res.data.success) {
        setOrder(res.data.order);
        setCancelAllowed(res.data.cancelAllowed);
        setRemainingSeconds(res.data.remainingSeconds ?? 5);
      }
    } catch {
      toast.error("Order not found");
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL FETCH + POLLING ================= */
  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  /* ================= CANCEL COUNTDOWN ================= */
  useEffect(() => {
    if (!cancelAllowed || remainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cancelAllowed, remainingSeconds]);

  /* ================= CANCEL ORDER ================= */
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

  /* ================= CASH PAYMENT ================= */
  const handleCashPayment = async () => {
    try {
      setPaying(true);
      const res = await axios.post(
        `${API_BASE}/orders/${orderId}/pay-cash`
      );
      if (res.data.success) {
        toast.success("Cash payment selected");
        fetchOrder();
      }
    } catch {
      toast.error("Cash payment failed");
    } finally {
      setPaying(false);
    }
  };

  /* ================= ONLINE PAYMENT ================= */
  const handleOnlinePayment = async () => {
    try {
      setPaying(true);

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Razorpay SDK failed to load");
        setPaying(false);
        return;
      }

      const res = await axios.post(
        `${API_BASE}/payment/create-order`,
        { amount: order.totalAmount }
      );

      if (!res.data.success) {
        toast.error("Unable to initiate payment");
        setPaying(false);
        return;
      }

      const razorpayOrder = res.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Smart Restaurant",
        description: "Food Order Payment",
        order_id: razorpayOrder.id,

        handler: function () {
          toast.success("Payment successful. Awaiting confirmation...");
        },

        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
            setPaying(false);
          },
        },

        prefill: {
          name: order?.customerName || "",
          contact: order?.customerMobile || "",
        },

        theme: {
          color: "#facc15",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Unable to start payment");
      setPaying(false);
    }
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        Loading...
      </div>
    );
  }

  const isPaid = order?.paymentStatus === "Paid";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl p-6 border border-yellow-500 shadow-2xl">

        {/* Header */}
        <div className="flex justify-center items-center mb-6">
          <span className="text-4xl font-bold text-yellow-400">Smart</span>
          <span className="ml-2 text-xl">Restaurant</span>
        </div>

        {/* Order Info */}
        <div className="bg-[#0f172a] rounded-xl p-5 text-center mb-5">
          <h1 className="text-2xl font-bold text-yellow-400">
            Order Successful
          </h1>
          <p className="text-gray-400 mt-1">
            Order ID: <span className="font-mono">{orderId}</span>
          </p>

          {cancelAllowed && remainingSeconds > 0 && (
            <div className="mt-4">
              <p className="text-red-400 mb-2 text-sm">
                Cancel available for <b>{remainingSeconds}s</b>
              </p>

              <div className="w-full h-2 bg-gray-700 rounded overflow-hidden mb-3">
                <div
                  className="h-full bg-red-600 transition-all duration-1000"
                  style={{ width: `${(remainingSeconds / 5) * 100}%` }}
                />
              </div>

              <button
                onClick={handleCancel}
                disabled={canceling}
                className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                {canceling ? "Cancelling..." : "Cancel Order"}
              </button>
            </div>
          )}
        </div>

        {/* Payment Section */}
        {!isPaid ? (
          <div className="bg-[#0f172a] rounded-xl p-5 mb-5">
            <h2 className="text-lg font-bold text-yellow-400 mb-4">
              Payment Pending
            </h2>

            <button
              onClick={handleOnlinePayment}
              disabled={paying}
              className="w-full py-3 mb-3 rounded-lg bg-green-500 hover:bg-green-600 text-black font-bold transition"
            >
              Pay Online (UPI / Card)
            </button>

            <button
              onClick={handleCashPayment}
              disabled={paying}
              className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition"
            >
              Pay at Counter (Cash)
            </button>
          </div>
        ) : (
          <div className="bg-green-900/30 rounded-xl p-4 mb-5 text-center">
            <p className="text-green-400 font-bold text-lg">
              Payment Successful ✅
            </p>
            <p className="text-gray-300 text-sm">
              Mode: {order.paymentMethod}
            </p>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition"
        >
          Return to Menu
        </button>
      </div>
    </div>
  );
}




