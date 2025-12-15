import React from "react";

export default function RestaurantCard({ item, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
        {item.restaurantImg ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000'}/uploads/restaurants/${item.restaurantImg}`}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{item.type} • {item.contact}</p>
        <p className="text-sm text-gray-500 mt-1 truncate">{item.address}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item)}
              className="px-3 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item)}
              className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
