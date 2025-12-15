import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// User Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuSections from "./pages/MenuSections";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AddAdmin from "./pages/Admin/AddAdmin.jsx";
import Categories from "./pages/Admin/Categories.jsx";
import Orders from "./pages/Admin/Orders.jsx";

// Restaurant Pages
import Restaurant from "./pages/Admin/RestaurantManagement.jsx";
import RestaurantView from "./pages/Admin/RestaurantView.jsx";
import AddRestaurant from "./pages/Admin/AddRestaurant.jsx";

// Tables
import TableManagement from "./pages/Admin/Tables/TableManagement.jsx";

// Menu
import MenuPage from "./pages/Admin/MenuPage.jsx";

// Route Protection
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>

      {/* Auth Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/menu-sections" element={<MenuSections />} />
      </Route>

      {/* Admin Section */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Admin Module */}
        <Route path="add-admin" element={<AddAdmin />} />
        <Route path="categories" element={<Categories />} />


        {/* ⭐ NEW ROUTE */}
        <Route path="restaurant" element={<Restaurant />} />
        <Route path="restaurant/edit/:id" element={<AddRestaurant />} />

        {/* Tables */}
        <Route path="tables" element={<TableManagement />} />

        {/* Orders */}
        <Route path="orders" element={<Orders />} />

        {/* Optional */}
        <Route path="add-restaurant" element={<AddRestaurant />} />
      </Route>
    </Routes>
  );
}
