import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// NOTE: Removed direct CSS import to resolve compilation error: 
// import "react-toastify/dist/ReactToastify.css";
import { UserPlus, Loader2 } from "lucide-react"; 

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

    // NOTE: In a real environment, you should replace localStorage with
    // a more secure, context-based authentication mechanism.
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
  const API_BASE = import.meta.env.VITE_API_URL;

  const { data } = await axios.post(
    `${API_BASE}/auth/register-admin`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  toast.success("✅ New administrator added successfully!", {
    position: "top-center",
    autoClose: 2000,
    theme: "colored",
  });

  // Clear form after success
  setFormData({ name: "", email: "", password: "" });

} catch (error) {
  toast.error(
    error.response?.data?.message ||
      "❌ Failed to add administrator. Check server logs.",
    {
      position: "top-center",
      autoClose: 2500,
      theme: "colored",
    }
  );
} finally {
  setLoading(false);
}
};





  return (
    // Updated to use the Dashboard's warm background color
    <div className="flex justify-center items-center min-h-screen bg-orange-50/50 p-4 sm:p-6">
      
      {/* Container: Elevated, rounded card with a professional shadow */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-lg border border-slate-100">
        
        {/* Header Section */}
        <header className="text-center mb-8">
            <UserPlus className="text-5xl text-blue-600 mx-auto mb-3" />
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Add New Administrator
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
                Create credentials for a new user with administrative privileges.
            </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Full Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                         transition duration-150 ease-in-out placeholder-slate-400 text-slate-700 shadow-sm"
              placeholder="Enter full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                         transition duration-150 ease-in-out placeholder-slate-400 text-slate-700 shadow-sm"
              placeholder="Enter email address"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Temporary Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                         transition duration-150 ease-in-out placeholder-slate-400 text-slate-700 shadow-sm"
              placeholder="Min. 8 characters"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            // Primary action blue button with professional hover/active states
            className={`w-full py-3 rounded-xl text-white font-semibold shadow-md transition-all duration-200 
                        flex items-center justify-center space-x-2 text-lg
                        ${
                          loading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-500/30"
                        }`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <span>Add Administrator</span>
            )}
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}