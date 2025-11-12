import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // 🎞️ Animate background + card with GSAP
  useEffect(() => {
    gsap.to(".auth-page", {
      backgroundPosition: "200% center",
      duration: 10,
      repeat: -1,
      yoyo: true,
    });
    gsap.from(".auth-card", { opacity: 0, y: 30, duration: 1 });
  }, []);

  // Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🧠 Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        formData
      );

      // ✅ Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🎉 Welcome toast
      toast.success(`👋 Welcome back, ${data.user.name}!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });

      // 🕒 Redirect to Home after 2s
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Login failed", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        theme: "colored",
      });
    }
  };

  return (
    <div className="auth-page flex justify-center items-center min-h-screen">
      <div className="auth-card">
        <h1 className="auth-title">🍽️ Smart Restaurant</h1>
        <h2 className="auth-subtitle"><b>Welcome Back</b></h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              autoComplete="off"
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
            <label>Password</label>
          </div>

          <button type="submit" className="auth-btn gradient-btn">
            Login
          </button>
        </form>

        <p className="auth-text">
          New user?{" "}
          <span onClick={() => navigate("/register")} className="link">
            Create a new account →
          </span>
        </p>
      </div>

      {/* Toastify Notification Container */}
      <ToastContainer />
    </div>
  );
}
  