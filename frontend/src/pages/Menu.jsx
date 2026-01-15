// src/pages/Menu.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

const Section = ({ title, data }) => {
  const { addItem } = useCart();

  const handleAddToCart = (item) => {
    addItem({
      itemId: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
    });

    toast.success(`${item.name} added to cart 🛒`, {
      duration: 2000,
      style: {
        background: "#1e293b",
        color: "#facc15",
        border: "1px solid #facc15",
      },
      iconTheme: {
        primary: "#facc15",
        secondary: "#000",
      },
    });
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 border-l-4 border-yellow-500 pl-3">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {data.map((item, i) => (
          <motion.div
            key={item._id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-yellow-800 rounded-xl shadow-md overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl hover:scale-105"
          >
            {/* Image */}
            <div className="w-full h-36 overflow-hidden rounded-t-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-md sm:text-lg font-semibold text-yellow-400">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{item.category}</p>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-yellow-300 font-bold text-sm sm:text-base">
                  ₹{item.price}
                </p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-semibold transition-colors active:scale-95"
                >
                  <FaShoppingCart className="text-sm" /> Add
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API_BASE}/menus`);
        setMenuItems(res.data?.data || res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const categories = [...new Set(menuItems.map((item) => item.category))];

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-yellow-400 text-2xl">
        Loading Menu...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-xl">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] py-20 px-4 sm:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-yellow-400 mb-16 tracking-wide">
          🍽️ Our Special Menu
        </h1>

        {categories.map((cat) => (
          <Section
            key={cat}
            title={cat}
            data={menuItems.filter((item) => item.category === cat)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
