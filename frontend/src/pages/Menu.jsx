// src/pages/Menu.jsx
import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

// 🥗 Menu Data
const items = [
  // 🌿 Veg
  {
    category: "Veg",
    name: "Paneer Butter Masala",
    price: "$18.00",
    img: "https://images.pexels.com/photos/12737916/pexels-photo-12737916.jpeg",
  },
  {
    category: "Veg",
    name: "Veg Biryani",
    price: "$16.50",
    img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
  },
  {
    category: "Veg",
    name: "Palak Paneer",
    price: "$17.00",
    img: "https://images.pexels.com/photos/31249589/pexels-photo-31249589.jpeg",
  },
  {
    category: "Veg",
    name: "Dal Tadka",
    price: "$12.00",
    img: "https://images.pexels.com/photos/30203314/pexels-photo-30203314.jpeg",
  },
  {
    category: "Veg",
    name: "Chole Bhature",
    price: "$14.00",
    img: "https://media.istockphoto.com/id/1328524212/photo/katlambe-chole.jpg?s=1024x1024&w=is&k=20&c=XV39ZZOWsLDE-_ioQyBZ5ExzFLilfqv9GF9gWF-CFvE=",
  },

  // 🍗 Non-Veg
  {
    category: "Non-Veg",
    name: "Butter Chicken",
    price: "$22.00",
    img: "https://images.unsplash.com/photo-1606756790138-8a36a2d2e33d",
  },
  {
    category: "Non-Veg",
    name: "Chicken Tikka Masala",
    price: "$24.00",
    img: "https://images.unsplash.com/photo-1604908177225-d4f5f63be0f2",
  },
  {
    category: "Non-Veg",
    name: "Mutton Rogan Josh",
    price: "$26.00",
    img: "https://images.unsplash.com/photo-1625938142383-1b830a83e2d9",
  },
  {
    category: "Non-Veg",
    name: "Beef Steak",
    price: "$28.00",
    img: "https://images.unsplash.com/photo-1600891963939-997e3a6932b8",
  },
  {
    category: "Non-Veg",
    name: "Fish Curry",
    price: "$20.00",
    img: "https://images.unsplash.com/photo-1625938142383-1b830a83e2d9",
  },

  // 🍰 Desserts
  {
    category: "Desserts",
    name: "Chocolate Cutlet",
    price: "$12.00",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
  {
    category: "Desserts",
    name: "Gulab Jamun",
    price: "$10.00",
    img: "https://images.unsplash.com/photo-1617196034796-73dfdd2a9b49",
  },
  {
    category: "Desserts",
    name: "Cheesecake",
    price: "$14.00",
    img: "https://images.unsplash.com/photo-1605475128023-917ac3d64b5b",
  },
  {
    category: "Desserts",
    name: "Rasmalai",
    price: "$11.00",
    img: "https://images.unsplash.com/photo-1617627053519-814bf92f9fdb",
  },
  {
    category: "Desserts",
    name: "Tiramisu",
    price: "$15.00",
    img: "https://images.unsplash.com/photo-1599785209707-28e0f64f0e0a",
  },

  // 🍹 Drinks
  {
    category: "Drinks",
    name: "Mango Lassi",
    price: "$8.00",
    img: "https://images.unsplash.com/photo-1587017539504-67cf0d13bc1b",
  },
  {
    category: "Drinks",
    name: "Cold Coffee",
    price: "$7.00",
    img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
  },
  {
    category: "Drinks",
    name: "Lemon Mojito",
    price: "$9.00",
    img: "https://images.unsplash.com/photo-1576402187878-974f70c890a5",
  },
  {
    category: "Drinks",
    name: "Iced Tea",
    price: "$6.00",
    img: "https://images.unsplash.com/photo-1629117089374-c1b5c0b5a3d4",
  },
  {
    category: "Drinks",
    name: "Coca-Cola",
    price: "$5.00",
    img: "https://images.unsplash.com/photo-1587202372775-e229f172b98c",
  },
];

// 🧾 Section Component
const Section = ({ title, data }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-yellow-400 mb-6 border-l-4 border-yellow-500 pl-3">
      {title}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="bg-gradient-to-b from-slate-800/80 to-slate-900/60 border border-yellow-600 rounded-2xl shadow-lg hover:shadow-yellow-500/40 overflow-hidden backdrop-blur-md"
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-yellow-400">
              {item.name}
            </h3>
            <p className="text-gray-300">{item.category}</p>
            <p className="text-yellow-300 font-bold mt-2">{item.price}</p>
            <button className="mt-3 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold flex items-center justify-center mx-auto gap-2 transition">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const Menu = () => {
  const categories = ["Veg", "Non-Veg", "Desserts", "Drinks"];

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
            data={items.filter((i) => i.category === cat)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
