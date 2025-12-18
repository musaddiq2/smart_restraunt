import React from "react";
import { Routes, Route } from "react-router-dom";
import OrderSuccess from "./pages/OrderSuccess";
import Cart from "./pages/Cart";



import Checkout from "./pages/Checkout"; // ✅ ADDED
// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu_Sections from "./pages/menuSections";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AddAdmin from "./pages/Admin/AddAdmin.jsx";
import Categories from "./pages/Admin/Categories.jsx";

// ⭐ Restaurant Management System
import Restaurant from "./pages/Admin/RestaurantManagement.jsx";
import RestaurantView from "./pages/Admin/RestaurantView.jsx"; // ⭐ NEW
import AddRestaurant from "./pages/Admin/AddRestaurant.jsx";  // USED FOR EDIT + ADD

import TableList from "./pages/Admin/Tables/TableList.jsx";
import MenuPage from "./pages/Admin/MenuPage.jsx";

// Route Protection
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      {/* 🔐 Auth Pages (NO NAVBAR) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> {/* ✅ ADDED */}
                <Route
  path="/order-success/:orderId"
  element={<OrderSuccess />}
/>

      {/* 🌐 Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/menu-sections" element={<Menu_Sections />} />
      </Route>

      {/* 👑 Admin Section */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-admin" element={<AddAdmin />} />
        <Route path="categories" element={<Categories />} />
        <Route path="menu" element={<MenuPage />} />

        {/* ⭐ Restaurant Management Routes */}
        <Route path="restaurant" element={<Restaurant />} />
        <Route path="restaurant/view/:id" element={<RestaurantView />} />

        {/* ⭐⭐ UPDATED: EDIT RESTAURANT ROUTE */}
        {/* ----------------------------------------- */}
        {/* ⬇⬇⬇  THIS IS THE NEWLY ADDED ROUTE  ⬇⬇⬇ */}
        <Route path="restaurant/edit/:id" element={<AddRestaurant />} />
        {/* ----------------------------------------- */}

        <Route path="tables" element={<TableList />} />



      

        {/* Optional — Only keep if still used */}
        <Route path="add-restaurant" element={<AddRestaurant />} />
      </Route>
    </Routes>
  );
}
