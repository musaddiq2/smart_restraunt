import React from "react";
import { Routes, Route } from "react-router-dom";

// Order & Cart
import OrderSuccess from "./pages/OrderSuccess";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// User Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import MenuSections from "./pages/MenuSections";

// Admin Layout & Pages
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

      {/* ================= AUTH ROUTES ================= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ================= CART & ORDER ================= */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success/:orderId" element={<OrderSuccess />} />

      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/menu-sections" element={<MenuSections />} /> */}
      </Route>

      {/* ================= ADMIN ROUTES ================= */}
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

        {/* Admin Management */}
        <Route path="add-admin" element={<AddAdmin />} />

        {/* Categories */}
        <Route path="categories" element={<Categories />} />

        {/* Menu */}
        <Route path="menu" element={<MenuPage />} />

        {/* Orders */}
        <Route path="orders" element={<Orders />} />

        {/* Restaurant */}
        <Route path="restaurant" element={<Restaurant />} />
        <Route path="restaurant/edit/:id" element={<AddRestaurant />} />

        {/* Tables */}
        <Route path="tables" element={<TableManagement />} />

        {/* Optional / Legacy */}
        <Route path="add-restaurant" element={<AddRestaurant />} />
      </Route>

    </Routes>
  );
}
