import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  useEffect(() => {
    gsap.to(".auth-page", {
      backgroundPosition: "200% center",
      duration: 10,
      repeat: -1,
      yoyo: true,
    });
    gsap.from(".auth-card", { opacity: 0, y: 30, duration: 1 });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
      return alert("Passwords do not match!");

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
      const { data } = await axios.post(
        `${API_URL}/auth/register`,
        formData
      );
      alert(`🎉 Welcome ${data.user.name}!`);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">🍽️ Smart Restaurant</h1>
        <h2 className="auth-subtitle">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input type="text" name="name" required onChange={handleChange} />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input type="email" name="email" required onChange={handleChange} />
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

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
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
          <span onClick={() => navigate("/login")}>Login →</span>
        </p>
      </div>
    </div>
  );
}
