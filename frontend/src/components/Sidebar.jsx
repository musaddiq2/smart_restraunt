import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
  UserPlus,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  // Sidebar menu items
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Orders", icon: <ShoppingBag size={20} />, path: "/admin/orders" },
    { name: "Menu", icon: <Utensils size={20} />, path: "/admin/menu" },
    { name: "Add Admin", icon: <UserPlus size={20} />, path: "/admin/add-admin" },
  ];

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-lg min-h-screen">
      {/* 🧠 Logo Section */}
      <div className="p-6 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold text-green-400">Smart Admin</h1>
        <p className="text-gray-400 text-sm mt-1">Restaurant Dashboard</p>
      </div>

      {/* 🧭 Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-green-500 text-white shadow-md"
                  : "hover:bg-gray-700 text-gray-300"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* ⚙️ Settings & Logout Section */}
      <div className="border-t border-gray-700 p-4 space-y-2">
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all ${
              isActive
                ? "bg-green-500 text-white shadow-md"
                : "hover:bg-gray-700 text-gray-300"
            }`
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

        {/* 🚪 Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full text-left text-red-400 hover:bg-gray-700 hover:text-red-300 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* 📅 Footer */}
      <div className="p-3 text-center border-t border-gray-700 text-gray-500 text-xs">
        © {new Date().getFullYear()} Smart Restaurant
      </div>
    </aside>
  );
}
