// src/components/AnalyticsCard.jsx
import React from "react";

export default function AnalyticsCard({ title, value, growth }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-green-600 text-sm mt-2">{growth}</p>
    </div>
  );
}
