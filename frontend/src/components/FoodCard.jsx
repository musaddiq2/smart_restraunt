/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

export default function FoodCard({ item, onAdd }) {
  return (
    <motion.article
      layout
      whileHover={{ translateY: -8 }}
      className="rounded-2xl overflow-hidden border border-slate-700/40 bg-white/6 backdrop-blur-md shadow-md"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-44 object-cover transform transition-transform duration-600 hover:scale-105"
        />
        {/* subtle top-left badge */}
        <div className="absolute left-3 top-3 px-2 py-1 rounded-md bg-white/10 text-xs text-white/90 backdrop-blur-sm">
          {item.category}
        </div>
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-sky-200">{item.name}</h3>
        <p className="text-sm text-slate-300 mt-1">{item.description ?? ""}</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-xl font-bold text-purple-200">{item.price}</div>
        </div>

        <button
          onClick={() => onAdd?.(item)}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-400 via-purple-400 to-sky-400 text-white shadow hover:scale-105 transition"
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </motion.article>
  );
}
