import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* ===== Layouts ===== */
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

/* ===== Public Pages ===== */
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* ===== Cart & Orders ===== */
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

/* ===== Admin Core ===== */
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AddAdmin from "./pages/Admin/AddAdmin";
import Categories from "./pages/Admin/Categories";
import Orders from "./pages/Admin/Orders";
import RestaurantManagement from "./pages/Admin/RestaurantManagement";
import AddRestaurant from "./pages/Admin/AddRestaurant";
import MenuPage from "./pages/Admin/MenuPage";
import TableManagement from "./pages/Admin/Tables/TableManagement";

/* ===== Advanced Admin Pages ===== */
import AdminManagement from "./pages/Admin/AdminManagement";
import SubscriptionManagement from "./pages/Admin/SubscriptionManagement";
import ProjectStatus from "./pages/Admin/ProjectStatus";
import ClientManagement from "./pages/Admin/ClientManagement";
import SystemAnalytics from "./pages/Admin/SystemAnalytics";
import SecurityControl from "./pages/Admin/SecurityControl";

/* ===== Route Protection ===== */
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>

      {/* ========= AUTH ========= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ========= PUBLIC ========= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
      </Route>

      {/* ========= ADMIN ========= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* Core */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="categories" element={<Categories />} />
        <Route path="tables" element={<TableManagement />} />

        {/* Restaurant */}
        <Route path="restaurants" element={<RestaurantManagement />} />
        <Route path="restaurants/add" element={<AddRestaurant />} />
        <Route path="restaurants/edit/:id" element={<AddRestaurant />} />

        {/* Admin / System */}
        <Route path="add-admin" element={<AddAdmin />} />
        <Route path="admin-management" element={<AdminManagement />} />
        <Route path="subscriptions" element={<SubscriptionManagement />} />
        <Route path="project-status" element={<ProjectStatus />} />
        <Route path="clients" element={<ClientManagement />} />
        <Route path="analytics" element={<SystemAnalytics />} />
        <Route path="security" element={<SecurityControl />} />
      </Route>

      {/* ========= FALLBACK ========= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default App;
