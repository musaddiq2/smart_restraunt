import React from "react";
import { useSelector } from "react-redux";
import { Table, Check, XCircle } from "lucide-react";

export default function TableAnalytics() {
  const { list = [] } = useSelector((s) => s.tables);
  const total = list.length;
  const available = list.filter((t) => t.status === "Available").length;
  const booked = list.filter((t) => t.status === "Booked").length;
  const occupied = list.filter((t) => t.status === "Occupied").length;

  const cards = [
    { title: "Total", count: total, color: "orange", icon: <Table size={24}/> },
    { title: "Available", count: available, color: "green", icon: <Check size={24}/> },
    { title: "Booked", count: booked, color: "blue", icon: <Table size={24}/> },
    { title: "Occupied", count: occupied, color: "red", icon: <XCircle size={24}/> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((c) => (
        <div key={c.title} className={`p-4 bg-white rounded shadow border-l-4 border-${c.color}-500 flex justify-between`}>
          <div>
            <p className="text-sm text-gray-500">{c.title}</p>
            <h3 className="text-2xl font-bold">{c.count}</h3>
          </div>
          <div className={`p-3 rounded-full bg-${c.color}-100 text-${c.color}-600`}>{c.icon}</div>
        </div>
      ))}
    </div>
  );
}
