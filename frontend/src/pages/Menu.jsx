// src/pages/Menu.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";


const Section = ({ title, data }) => {
  const { addItem } = useCart(); // ✅ correct function

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 border-l-4 border-yellow-500 pl-3">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, i) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-gradient-to-b from-slate-800/80 to-slate-900/60 border border-yellow-600 rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-2xl"
            />

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-yellow-400">
                {item.name}
              </h3>

              <p className="text-gray-300">{item.category}</p>

              <p className="text-yellow-300 font-bold mt-2">
                ₹{item.price}
              </p>

              <button
                onClick={() =>
                  addItem({
                    itemId: item._id,   // ✅ REQUIRED
                    name: item.name,    // ✅ MUST be `name`
                    price: item.price,
                    image: item.image,
                  })
                }
                className="mt-3 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold flex items-center justify-center mx-auto gap-2"
              >
                <FaShoppingCart /> Add to Cart
              </button>
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

  // 🔥 FETCH ALL MENUS
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/menus");
        const json = await res.json();

        // Handle both response formats
        const data = Array.isArray(json) ? json : json.data;

        setMenuItems(data || []);
      } catch (err) {
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // 🧠 Dynamic Categories from DB
  const categories = [...new Set(menuItems.map(item => item.category))];

  // ⏳ Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-yellow-400 text-2xl">
        Loading Menu...
      </div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] py-24 px-6 sm:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-yellow-400 mb-16 tracking-wide">
          🍽️ Our Special Menu
        </h1>

        {categories.map((cat) => (
          <Section
            key={cat}
            title={cat}
            data={menuItems.filter(item => item.category === cat)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;

