

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
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
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { cart } = useCart();
  const cartRef = useRef(null);

  // Calculate cart count
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  // Sticky Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserMenuOpen(false);
    navigate("/login");
  };

  // Close cart modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartModalOpen(false);
      }
    };
    if (cartModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartModalOpen]);

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
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between relative">
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
                      className="block px-4 py-2 hover:bg-yellow-400 transition"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#about" className="hover:text-yellow-400 transition">About</a>
          <a href="#chef" className="hover:text-yellow-400 transition">Chef</a>
          <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-4 relative">
          {/* Cart Icon */}
          <button
            onClick={() => setCartModalOpen(!cartModalOpen)}
            className="relative p-2 hover:text-yellow-400 transition"
          >
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

        {/* Cart Modal with backdrop */}
<AnimatePresence>
  {cartModalOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black z-40"
        onClick={() => setCartModalOpen(false)}
      />

      {/* Modal */}
      <motion.div
        ref={cartRef}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-4 top-20 w-80 md:w-96 bg-white text-black rounded-xl shadow-2xl z-50 overflow-hidden"
      >
        {cart.items.length > 0 ? (
          <div className="p-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
            {cart.items.map((item) => (
              <motion.div
                key={item.itemId}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,235,59,0.1)",
                }}
                className="flex items-center justify-between gap-3 border-b pb-2 rounded-md transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-yellow-500 font-bold">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
                <p className="text-gray-400">
                  ₹{(item.price * item.quantity).toFixed(0)}
                </p>
              </motion.div>
            ))}

            <button
              onClick={() => {
                navigate("/cart");
                setCartModalOpen(false);
              }}
              className="mt-3 w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              View Details
            </button>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Your cart is empty
          </div>
        )}
      </motion.div>
    </>
  )}
</AnimatePresence>


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
                      className="px-4 py-2 flex items-center gap-2 hover:bg-red-100 transition"
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
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </motion.header>
  );
}

