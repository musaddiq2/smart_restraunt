// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    gsap.to(".auth-page", {
      backgroundPosition: "200% center",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.fromTo(
      ".auth-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    );
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/register", formData);
      alert(`🎉 Welcome ${data.user.name}! Registration successful.`);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">🍽️ Smart Restaurant</h1>
        <h2 className="auth-subtitle">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              required
            />
            <label>Phone Number</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              required
            />
            <label>Confirm Password</label>
          </div>

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <p className="auth-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login here →</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
