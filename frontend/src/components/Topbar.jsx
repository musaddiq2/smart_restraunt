// src/components/Topbar.jsx
import React from "react";
import { Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell className="text-gray-600" size={22} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
}
