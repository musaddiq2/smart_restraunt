import React from "react";

export default function ChefStatusCard() {
  const chefs = [
    { name: "Chef Imran", status: "Working" },
    { name: "Chef Raghav", status: "On Break" },
    { name: "Chef Ayaan", status: "Holiday" },
    { name: "Chef Mehul", status: "Working" },
  ];

  const statusColor = {
    "Working": "text-green-400 bg-green-600/30",
    "On Break": "text-yellow-400 bg-yellow-600/30",
    "Holiday": "text-red-400 bg-red-600/30",
  };

  return (
    <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-800 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Chef Activity Status
      </h2>

      <div className="space-y-3">
        {chefs.map((chef, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-800/40 p-3 rounded-lg"
          >
            <div>
              <p className="text-gray-200 font-medium">{chef.name}</p>
              <p className="text-gray-400 text-xs">Kitchen Staff</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                statusColor[chef.status]
              }`}
            >
              {chef.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
