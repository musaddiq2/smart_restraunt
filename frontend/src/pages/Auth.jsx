import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { loginUser, registerUser } from "../api/authAPI";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";

export default function Auth() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email: form.email, password: form.password });
      alert("Login successful!");
      console.log(res.data);
    } catch (err) {
      alert("Login failed!");
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      alert("Registration successful!");
      console.log(res.data);
    } catch (err) {
      alert("Registration failed!");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-500 relative overflow-hidden">
      {/* Animated background bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 rounded-full blur-xl"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 30, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3D Flip Card */}
      <motion.div
        className="relative w-[350px] h-[430px] [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* FRONT (Login) */}
        <div className="absolute w-full h-full bg-white/90 rounded-2xl shadow-xl p-8 backface-hidden">
          <h2 className="text-2xl font-bold text-center text-sky-600 mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex items-center border-b border-gray-300">
              <FaEnvelope className="text-sky-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-2"
              />
            </div>
            <div className="flex items-center border-b border-gray-300">
              <FaLock className="text-sky-500 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-2 mt-4 rounded-lg hover:bg-sky-600 transition"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            New here?{" "}
            <button
              onClick={() => setIsFlipped(true)}
              className="text-sky-600 font-bold hover:underline"
            >
              Register Now
            </button>
          </p>
        </div>

        {/* BACK (Register) */}
        <div className="absolute w-full h-full bg-white/90 rounded-2xl shadow-xl p-8 rotate-y-180 backface-hidden">
          <h2 className="text-2xl font-bold text-center text-sky-600 mb-6">New Registration</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex items-center border-b border-gray-300">
              <FaUserAlt className="text-sky-500 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-2"
              />
            </div>
            <div className="flex items-center border-b border-gray-300">
              <FaEnvelope className="text-sky-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-2"
              />
            </div>
            <div className="flex items-center border-b border-gray-300">
              <FaLock className="text-sky-500 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-2 mt-4 rounded-lg hover:bg-sky-600 transition"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <button
              onClick={() => setIsFlipped(false)}
              className="text-sky-600 font-bold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
