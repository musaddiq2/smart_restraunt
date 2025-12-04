// src/pages/admin/RestaurantView.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function RestaurantView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const API = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"}/restaurant/${id}`;

  useEffect(() => {
    const fetchOne = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API);
        setRestaurant(res.data);
      } catch (err) {
        console.error("Failed to fetch restaurant:", err);
        alert("Restaurant not found");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
  }, [API, navigate]);

  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [loading]);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;
  if (!restaurant) return <div className="p-6 text-center text-red-500">Restaurant not found</div>;

  return (
    <div ref={containerRef} className="p-6 max-w-5xl mx-auto">
      {/* Heading Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          {restaurant.name}
        </h1>
        <div className="space-x-3">
          <Link
            to="/admin/restaurant"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Back
          </Link>
          <Link
            to={`/admin/restaurant`}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Edit
          </Link>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 p-6 transition-transform hover:scale-[1.01] duration-300">
        {/* Image Section */}
        <div className="col-span-1 rounded-xl overflow-hidden shadow-md">
          {restaurant.restaurantImg ? (
            <img
              src={restaurant.restaurantImg}
              alt={restaurant.name}
              className="w-full h-56 object-cover rounded-xl transform hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-56 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="col-span-2 space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">ID:</span>
            <span className="font-mono">{restaurant.restaurantId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Type:</span>
            <span>{restaurant.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Contact:</span>
            <span>{restaurant.contact || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{restaurant.email || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Address:</span>
            <span>{restaurant.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Opening Time:</span>
            <span>{restaurant.openingTime} → {restaurant.closingTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span className={`${restaurant.status === "Open" ? "text-green-500" : "text-red-500"}`}>
              {restaurant.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
