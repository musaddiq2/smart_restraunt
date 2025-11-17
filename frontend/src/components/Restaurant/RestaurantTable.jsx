import React from "react";

export default function RestaurantTable({ data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Image</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contact</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Open</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Close</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((r) => (
            <tr key={r._id}>
              <td className="px-4 py-3">
                {r.restaurantImg ? (
                  <img
                    src={`http://localhost:5000/uploads/restaurants/${r.restaurantImg}`}
                    alt={r.name}
                    className="w-16 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">—</div>
                )}
              </td>
              <td className="px-4 py-3 text-sm font-medium">{r.name}</td>
              <td className="px-4 py-3 text-sm">{r.type}</td>
              <td className="px-4 py-3 text-sm">{r.contact}</td>
              <td className="px-4 py-3 text-sm">{r.openingTime}</td>
              <td className="px-4 py-3 text-sm">{r.closingTime}</td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onEdit(r)}
                  className="text-white bg-blue-500 px-3 py-1 rounded mr-2 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(r)}
                  className="text-white bg-red-500 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
