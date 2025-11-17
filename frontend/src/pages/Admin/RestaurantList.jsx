import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantList = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "Bismillah Restaurant",
      category: "Indian",
      location: "Aurangabad",
    },
    {
      id: 2,
      name: "Italiano",
      category: "Italian",
      location: "Mumbai",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      setRestaurants(restaurants.filter((r) => r.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Restaurant List</h1>
        <button
          onClick={() => navigate("/admin/add-restaurant")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add Restaurant
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((r, index) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.category}</td>
                <td className="px-4 py-2">{r.location}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => navigate(`/admin/edit-restaurant/${r.id}`)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {restaurants.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No restaurants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantList;
