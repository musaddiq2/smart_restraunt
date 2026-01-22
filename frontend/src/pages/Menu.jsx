



// src/pages/Menu.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

/* ===================== Animations ===================== */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

/* ===================== Section ===================== */
const Section = ({ title, data }) => {
  const { cart, setCart } = useCart();

  const handleAddToCart = (item) => {
    if (!setCart) {
      console.error("❌ setCart not found in CartContext");
      toast.error("Cart system error");
      return;
    }

    setCart((prev) => {
      const items = prev?.items || [];

      const existingItem = items.find(
        (i) => i.itemId === item._id
      );

      let updatedItems;

      if (existingItem) {
        // Increase quantity
        updatedItems = items.map((i) =>
          i.itemId === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        // Add new item
        updatedItems = [
          ...items,
          {
            itemId: item._id,
            name: item.name,
            price: item.price,
            image: item.image || null,
            quantity: 1,
          },
        ];
      }

      return {
        ...prev,
        items: updatedItems,
      };
    });

    toast.success(`${item.name} added to cart 🛒`, {
      duration: 1800,
      style: {
        background: "#1e293b",
        color: "#facc15",
        border: "1px solid #facc15",
      },
    });
  };

  return (
    <div className="mb-14">
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
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-yellow-800 rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl hover:scale-105 transition-all"
          >
            {/* Image */}
            {item.image ? (
              <div className="w-full h-36 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            ) : (
              <div className="w-full h-36 bg-slate-800 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Content */}
            <div className="p-3 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-md sm:text-lg font-semibold text-yellow-400">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {item.category}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-yellow-300 font-bold">
                  ₹{item.price}
                </span>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-semibold transition-all active:scale-95"
                >
                  <FaShoppingCart /> Add
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ===================== Menu Page ===================== */
const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API_BASE}/menus`);
        setMenuItems(res.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const categories = [...new Set(menuItems.map((i) => i.category))];

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
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-yellow-400 mb-16">
          🍽️ Our Special Menu
        </h1>

        {categories.map((cat) => (
          <Section
            key={cat}
            title={cat}
            data={menuItems.filter((i) => i.category === cat)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
