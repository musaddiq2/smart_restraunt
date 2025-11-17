import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";

export default function RestaurantStats() {
  const [count, setCount] = useState(0);
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/restaurants/all");
        setCount(res.data.length);
        setLatest(res.data[0] || null);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-500">Total Restaurants</div>
        <div className="text-2xl font-bold mt-2">{count}</div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-500">Latest Restaurant</div>
        <div className="mt-2 font-medium">{latest ? latest.name : "—"}</div>
        <div className="text-xs text-gray-400">{latest ? new Date(latest.createdAt).toLocaleString() : ""}</div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-500">Open Now (sample)</div>
        <div className="text-2xl font-bold mt-2">{/* you can compute open/close logic */}—</div>
      </div>
    </div>
  );
}
