import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
  UserPlus,
  LogOut,
  User,
  Building2,
  QrCode,
  BarChart2,
  Shield,
} from "lucide-react";
import { MdCategory } from "react-icons/md";
import { motion } from "framer-motion";

export default function Sidebar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserName(user.name || user.email?.split("@")[0] || "Admin");
      }
    } catch {
      setUserName("Admin");
    }
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Orders", icon: ShoppingBag, path: "/admin/orders" },
    { name: "Menu", icon: Utensils, path: "/admin/menu" },
    { name: "Categories", icon: MdCategory, path: "/admin/categories" },
    { name: "Restaurants", icon: Building2, path: "/admin/restaurants" },
    { name: "Tables & QR", icon: QrCode, path: "/admin/tables" },

    { name: "Admin Management", icon: UserPlus, path: "/admin/admin-management" },
    { name: "Subscription Management", icon: BarChart2, path: "/admin/subscriptions" },
    { name: "Project Status", icon: BarChart2, path: "/admin/project-status" },
    { name: "Client Management", icon: User, path: "/admin/clients" },
    { name: "System Analytics", icon: BarChart2, path: "/admin/analytics" },
    { name: "Security & Control", icon: Shield, path: "/admin/security" },

    { name: "Logout", icon: LogOut, action: "logout" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-lg flex flex-col">
      
      {/* HEADER */}
      <div className="p-6 border-b text-center">
        <h1 className="text-2xl font-extrabold">
          <span className="text-rose-600">Admin</span> Panel
        </h1>

        <div className="mt-4 flex flex-col items-center">
          <User className="text-rose-500 mb-1" size={22} />
          <p className="text-sm font-semibold truncate w-full">{userName}</p>
          <p className="text-xs text-gray-400">Administrator</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          if (item.action === "logout") {
            return (
              <motion.button
                key={item.name}
                onClick={handleLogout}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 w-full p-3 text-red-600 rounded-lg hover:bg-red-50"
              >
                <Icon size={18} />
                {item.name}
              </motion.button>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-rose-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-rose-600"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 text-xs text-center text-gray-400 border-t">
        © {new Date().getFullYear()} FoodAdmin
      </div>
    </aside>
  );
}
