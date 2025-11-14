// src/pages/Admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* Page content (Dashboard / Add Admin / etc.) */}
        </main>
      </div>
    </div>
  );
}
