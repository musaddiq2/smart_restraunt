import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
  UserPlus,
  Settings,
  LogOut,
  User,
  Building2,
  QrCode,
} from "lucide-react";

import { motion } from "framer-motion";

export default function Sidebar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Admin User");

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUserName(user?.name || user?.email?.split("@")[0] || "Admin");
      } catch (e) {
        console.error("Failed to parse user", e);
        setUserName("System Admin");
      }
    }
  }, []);

  // ⭐ MENU ITEMS
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Orders", icon: ShoppingBag, path: "/admin/orders" },
    { name: "Menu", icon: Utensils, path: "/admin/menu" },
    { name: "Categories", icon: MdCategory, path: "/admin/categories", isReactIcon: true },
    { name: "Restaurant Management", icon: Building2, path: "/admin/restaurant" },
    { name: "Add Admin", icon: UserPlus, path: "/admin/add-admin" },

    // ⭐ TABLES & QR
    { name: "Tables & QR", icon: QrCode, path: "/admin/tables" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-xl min-h-screen">
      
      {/* Logo / User Section */}
      <div className="p-6 text-center border-b border-gray-100">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          <span className="text-rose-600">
            <u>Admin</u>
          </span>
        </h1>

        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <User size={22} className="text-rose-500 mb-1" />
          </motion.div>

          <p className="text-sm font-semibold text-slate-700 truncate w-full px-2">
            {userName}
          </p>
          <p className="text-xs text-slate-400">Administrator</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-base font-medium
                ${
                  isActive
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                    : "text-slate-700 hover:bg-gray-100 hover:text-rose-600"
                }`
              }
            >
              {/* Animated Icon */}
              <motion.div
                whileHover={{ scale: 1.3, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.isReactIcon ? (
                  <MdCategory size={20} />
                ) : (
                  <Icon size={20} />
                )}
              </motion.div>

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Settings + Logout */}
      <div className="border-t border-gray-100 p-4 space-y-2">
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all text-base font-medium
            ${
              isActive
                ? "bg-gray-200 text-slate-800"
                : "text-slate-500 hover:bg-gray-100 hover:text-slate-700"
            }`
          }
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 p-3 w-full text-left text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </motion.button>
      </div>

      {/* Footer */}
      <div className="p-4 text-center border-t border-gray-100 text-slate-400 text-xs">
        © {new Date().getFullYear()} FoodAdmin
      </div>
    </aside>
  );
}
