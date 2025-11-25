import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdCategory } from "react-icons/md";
<<<<<<< HEAD

=======
>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
  UserPlus,
  Settings,
  LogOut,
  ChevronRight,
  User,
<<<<<<< HEAD
  QrCode,
=======
>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Admin User");

<<<<<<< HEAD
=======
  // Fetch user data from localStorage
>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
<<<<<<< HEAD
        setUserName(user?.name || user?.email?.split("@")[0] || "Admin");
      } catch (e) {
        console.error("Failed to parse user", e);
=======

        if (user.name) {
          setUserName(user.name);
        } else if (user.email) {
          setUserName(user.email.split("@")[0]);
        }
      } catch (e) {
        console.error("Failed to parse user data", e);
>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
        setUserName("System Admin");
      }
    }
  }, []);

  // ⭐ MENU ITEMS UPDATED
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Orders", icon: <ShoppingBag size={20} />, path: "/admin/orders" },
    { name: "Menu", icon: <Utensils size={20} />, path: "/admin/menu" },
    { name: "Categories", icon: <MdCategory size={20} />, path: "/admin/categories" },
<<<<<<< HEAD
    { name: "Restaurant Management", icon: <Building2 size={20} />, path: "/admin/restaurant" },
=======
>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
    { name: "Add Admin", icon: <UserPlus size={20} />, path: "/admin/add-admin" },

    // ⭐ NEW — TABLES & QR
    { name: "Tables & QR", icon: <QrCode size={20} />, path: "/admin/tables" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-xl min-h-screen">
<<<<<<< HEAD
      
      {/* Logo / User Section */}
      <div className="p-6 text-center border-b border-gray-100">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          <span className="text-rose-600"><u>Admin</u></span>
        </h1>

=======

      {/* Logo + User Info */}
      <div className="p-6 text-center border-b border-gray-100">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          <span className="text-rose-600">
            <u>Admin</u>
          </span>
        </h1>

        <p className="text-slate-400 text-xs mt-1">Management Portal</p>

        {/* User display */}
>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col items-center">
          <User size={20} className="text-rose-500 mb-1" />
          <p className="text-sm font-semibold text-slate-700 truncate w-full px-2">
            {userName}
          </p>
          <p className="text-xs text-slate-400">Administrator</p>
        </div>
      </div>

<<<<<<< HEAD
      {/* Navigation */}
=======
      {/* Menu Navigation */}
>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
<<<<<<< HEAD
              `flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-base font-medium
              ${
                isActive
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                  : "text-slate-700 hover:bg-gray-100 hover:text-rose-600"
=======
              `flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-base font-medium group 
              ${isActive
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                : "text-slate-700 hover:bg-gray-100 hover:text-rose-600"
>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
              }`
            }
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.name}</span>
            </div>

<<<<<<< HEAD
            {/* Right arrow when active */}
            <ChevronRight size={18} className="opacity-70" />
=======
            {/* Active indicator FIXED */}
            {({ isActive }) =>
              isActive ? <ChevronRight size={18} className="text-white" /> : null
            }
>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
          </NavLink>
        ))}
      </nav>

      {/* Settings + Logout */}
      <div className="border-t border-gray-100 p-4 space-y-2">
<<<<<<< HEAD
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
=======

        {/* Settings */}
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-base font-medium group 
            ${isActive
              ? "bg-gray-200 text-slate-800"
              : "text-slate-500 hover:bg-gray-100 hover:text-slate-700"
            }`
          }
        >
          <div className="flex items-center gap-3">
            <Settings size={18} />
            <span>Settings</span>
          </div>

          {/* Settings active icon FIX */}
          {({ isActive }) =>
            isActive ? <ChevronRight size={18} className="text-slate-800" /> : null
          }
>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full text-left text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 text-center border-t border-gray-100 text-slate-400 text-xs">
        © {new Date().getFullYear()} FoodAdmin
      </div>
    </aside>
  );
}
