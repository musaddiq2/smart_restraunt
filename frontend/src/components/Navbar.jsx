/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/VR_Logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className={`fixed w-full z-50 transition-all duration-700 ${
        scrolled
          ? "bg-white/40 backdrop-blur-md text-slate-800 shadow-sm"
          : "text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="VR Logo"
            className={`w-10 h-10 rounded-full shadow-lg border-2 ${
              scrolled ? "border-slate-200" : "border-white/60"
            }`}
          />
          <div className="font-bold text-lg md:text-2xl leading-none">
            <span className="block">Smart</span>
            <span
              className={`text-sm font-normal ${
                scrolled ? "text-slate-700" : "text-white/90"
              }`}
            >
              Restaurant
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {/* Dropdown Menu */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1 font-semibold ${
                scrolled ? "text-slate-800" : "text-white"
              } hover:text-[#ff4e50] transition`}
            >
              Menu <FaChevronDown className="text-xs mt-1" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-8 left-0 bg-white/95 backdrop-blur-md shadow-lg rounded-lg py-2 w-40 border border-gray-100"
                >
                  {dropdownItems.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-[#ff4e50] hover:to-[#f9d423] hover:text-white rounded-md transition"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#about" className="hover:text-[#ff4e50] transition">
            About
          </a>
          <a href="#chef" className="hover:text-[#ff4e50] transition">
            Chef
          </a>
          <a href="#contact" className="hover:text-[#ff4e50] transition">
            Contact
          </a>
        </nav>

        {/* Icons + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            className={`p-2 rounded-md hover:scale-105 transition ${
              scrolled ? "text-slate-700" : "text-white"
            }`}
          >
            <FaShoppingCart />
          </button>
          <button
            className={`p-2 rounded-md hover:scale-105 transition ${
              scrolled ? "text-slate-700" : "text-white"
            }`}
          >
            <FaUser />
          </button>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 text-xl ${
              scrolled ? "text-slate-700" : "text-white"
            }`}
            onClick={() => setOpen((s) => !s)}
            aria-label="menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden bg-white/95 text-slate-800"
          >
            <div className="px-6 py-4 space-y-3">
              {/* Dropdown inside Mobile */}
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-2 font-semibold hover:text-[#ff4e50]">
                  Menu
                </summary>
                <div className="pl-4 mt-2 flex flex-col gap-2">
                  {dropdownItems.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="block py-1 text-gray-700 hover:text-[#ff4e50] transition"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </details>

              <a href="#about" className="block py-2 hover:text-[#ff4e50]">
                About
              </a>
              <a href="#chef" className="block py-2 hover:text-[#ff4e50]">
                Chef
              </a>
              <a href="#contact" className="block py-2 hover:text-[#ff4e50]">
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient bar for decoration */}
      <div
        className={`hidden md:block h-1 w-full ${
          scrolled
            ? "bg-gradient-to-r from-sky-400 via-purple-300 to-sky-400"
            : "bg-gradient-to-r from-[#ff4e50] via-[#f9d423] to-[#ff4e50] animate-gradient-move"
        }`}
      />
    </motion.header>
  );
}
