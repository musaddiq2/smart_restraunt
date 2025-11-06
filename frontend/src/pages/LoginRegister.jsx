import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import axios from "axios";
import "../styles/auth.css";

const LoginRegister = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Animate gradient background
    gsap.to(".auth-page", {
      backgroundPosition: "200% center",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isFlipped) {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        const { data } = await axios.post("/api/auth/register", formData);
        alert(`🎉 Welcome ${data.user.name}! Registration successful.`);
        setIsFlipped(false);
      } else {
        const { data } = await axios.post("/api/auth/login", formData);
        alert(`👋 Welcome back ${data.user.name}`);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="auth-page">
      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        {/* Login Side */}
        <div className="flip-card-front auth-card">
          <h2 className="auth-title">Welcome Back 🍽️</h2>
          <p className="auth-subtitle">Login to your account</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label>Email Address</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder=" "
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
            New here?{" "}
            <span onClick={() => setIsFlipped(true)}>Create Account</span>
          </p>
        </div>

        {/* Register Side */}
        <div className="flip-card-back auth-card">
          <h2 className="auth-title">Create Account ✨</h2>
          <p className="auth-subtitle">Join our restaurant family</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label>Full Name</label>
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label>Email Address</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label>Password</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label>Confirm Password</label>
            </div>
            <button type="submit" className="auth-btn gradient-btn">
              Register
            </button>
          </form>
          <p className="auth-text">
            Already have an account?{" "}
            <span onClick={() => setIsFlipped(false)}>Back to Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
