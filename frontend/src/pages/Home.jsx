import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [search, setSearch] = useState("");

  const foods = [
    {
      id: 1,
      name: "Margherita Pizza",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1601924582971-d06c3f3a80fc?w=800&q=80",
      category: "Pizza",
    },
    {
      id: 2,
      name: "Veggie Burger",
      price: 179,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
      category: "Burger",
    },
    {
      id: 3,
      name: "Pasta Alfredo",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1625944524472-fd278f5b3b60?w=800&q=80",
      category: "Pasta",
    },
    {
      id: 4,
      name: "Cold Coffee",
      price: 99,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
      category: "Beverage",
    },
    {
      id: 5,
      name: "Cheese Sandwich",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1606755962773-0e59b9c12b52?w=800&q=80",
      category: "Sandwich",
    },
    {
      id: 6,
      name: "Crispy Fries",
      price: 99,
      image:
        "https://images.unsplash.com/photo-1606755962773-0e59b9c12b52?w=800&q=80",
      category: "Snacks",
    },
  ];

  const filteredFoods = foods.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative mt-20 mb-12">
        <img
          src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1500&q=80"
          alt="Restaurant Banner"
          className="w-full h-[400px] object-cover rounded-3xl shadow-md"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center rounded-3xl text-white">
          <h1 className="text-5xl font-bold mb-3">
            Welcome to <span className="text-[#ff4e50]">Victus</span> Restaurant
          </h1>
          <p className="text-lg max-w-xl text-center">
            Craving something delicious? Order your favorite meal now!
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4e50]"
          />
        </div>
      </div>

      {/* Food Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-16">
        {filteredFoods.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-500 mb-3">{item.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#ff4e50] font-bold text-lg">
                  ₹{item.price}
                </span>
                <button className="bg-[#ff4e50] text-white px-4 py-2 rounded-full hover:bg-[#e63e3f] transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
