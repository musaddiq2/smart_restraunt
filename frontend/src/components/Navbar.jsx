import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-white/40 backdrop-blur-lg text-gray-800 shadow-sm"
          : "bg-gradient-to-r from-[#ff4e50] via-[#ff9f1c] to-[#ff4e50] text-white animate-gradient"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png" // 👈 place your logo file in public/logo.png
            alt="VR"
            className="w-10 h-10 rounded-full object-cover shadow-md"
          />
          <h1 className="text-2xl font-bold tracking-wide">
            Victus<span className="font-light"> Restaurant</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium relative">
          {/* Dropdown Menu */}
          <li
            className="relative group cursor-pointer flex items-center gap-1"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="hover:text-[#ff4e50] transition">Menu</span>
            <FaChevronDown
              className={`text-sm mt-[2px] transition-transform duration-200 ${
                dropdownOpen ? "rotate-180 text-[#ff4e50]" : ""
              }`}
            />
            {/* Dropdown Box */}
            <ul
              className={`absolute top-8 left-0 bg-white text-gray-700 shadow-lg rounded-md w-48 overflow-hidden transform transition-all duration-200 origin-top ${
                dropdownOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              }`}
            >
              {[
                "Veg",
                "Non-Veg",
                "Chapati",
                "Rice",
                "Dessert",
                "Cold-Drink",
              ].map((item, i) => (
                <li
                  key={i}
                  className="px-5 py-2 hover:bg-[#ff4e50] hover:text-white transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>

          <li className="hover:text-[#ff4e50] cursor-pointer transition">
            About
          </li>
          <li className="hover:text-[#ff4e50] cursor-pointer transition">
            Chef
          </li>
          <li className="hover:text-[#ff4e50] cursor-pointer transition">
            Contact
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <FaShoppingCart className="text-xl cursor-pointer hover:text-[#ff4e50] transition" />
          <FaUser className="text-xl cursor-pointer hover:text-[#ff4e50] transition" />
          {/* Hamburger for Mobile */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md text-gray-800 py-4 shadow-lg animate-fade-in-down">
          <ul className="flex flex-col items-center gap-4 text-lg">
            <li className="hover:text-[#ff4e50]">Menu</li>
            <li className="hover:text-[#ff4e50]">About</li>
            <li className="hover:text-[#ff4e50]">Chef</li>
            <li className="hover:text-[#ff4e50]">Contact</li>
            <li className="hover:text-[#ff4e50]">Cart</li>
          </ul>
        </div>
      )}
    </nav>
  );
}
