
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/VR_Logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { cart } = useCart(); // ✅ ONLY THIS

  // ✅ Calculate cart count safely
  const cartCount = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // ✅ Sticky Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Load user
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserMenuOpen(false);
    navigate("/login");
  };

  const dropdownItems = [
    { label: "Veg", href: "#veg" },
    { label: "Non-Veg", href: "#nonveg" },
    { label: "Rice", href: "#rice" },
    { label: "Roti", href: "#roti" },
    { label: "Starter", href: "#starter" },
    { label: "Dessert", href: "#dessert" },
    { label: "Cold-Drinks", href: "#drinks" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? "bg-white/60 backdrop-blur-md text-slate-800 shadow-sm"
          : "text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className={`w-10 h-10 rounded-full border-2 ${
              scrolled ? "border-slate-300" : "border-white/60"
            }`}
          />
          <div className="font-bold text-lg leading-none">
            <span className="block">Smart</span>
            <span className="text-sm font-normal">Restaurant</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 font-semibold">
              Menu <FaChevronDown className="text-xs" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-8 left-0 bg-white text-black rounded-lg shadow-md w-40"
                >
                  {dropdownItems.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-yellow-400"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#about">About</a>
          <a href="#chef">Chef</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2"
          >
            <FaShoppingCart className="text-xl" />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* User */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2"
              >
                <FaUser />
                {user.name}
                <FaChevronDown className="text-xs" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 bg-white text-black rounded shadow-md"
                  >
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-red-100"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button onClick={() => navigate("/login")}>
              <FaUser />
            </button>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
