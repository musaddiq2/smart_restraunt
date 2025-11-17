import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function PieChartCard() {

  const data = [
    { name: "Completed Orders", value: 420 },
    { name: "Processing", value: 150 },
    { name: "Pending", value: 95 },
    { name: "Cancelled", value: 35 },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#ef4444"];

  return (
    <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-800 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Order Distribution
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={COLORS[idx]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2 text-sm text-gray-300">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span>{item.name}</span>
            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
