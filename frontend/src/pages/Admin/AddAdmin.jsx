import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddAdmin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // 🧠 Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("⚠️ Unauthorized! Please log in first.", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"}/auth/register-admin`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("✅ New admin added successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });

      // Clear form after success
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Failed to add admin", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ➕ Add New Admin
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-medium transition-all ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Adding..." : "Add Admin"}
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}
