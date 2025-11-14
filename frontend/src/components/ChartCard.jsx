// src/components/ChartCard.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 4890 },
  { name: "Sat", sales: 6390 },
  { name: "Sun", sales: 4490 },
];

export default function ChartCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Weekly Sales Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
