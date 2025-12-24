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

/* ===== Layouts ===== */
import AdminLayout from "./pages/Admin/AdminLayout";

/* ===== Super Admin Pages ===== */
import Dashboard from "./pages/Admin/SuperAdmin/Dashboard";
import RestaurantManagement from "./pages/Admin/SuperAdmin/RestaurantManagement";
import AddRestaurant from "./pages/Admin/SuperAdmin/AddRestaurant";
import AdminManagement from "./pages/Admin/SuperAdmin/AdminManagement";
import AddAdmin from "./pages/Admin/SuperAdmin/AddAdmin";
import SubscriptionManagement from "./pages/Admin/SuperAdmin/SubscriptionManagement";
import ProjectStatus from "./pages/Admin/SuperAdmin/ProjectStatus";
import ClientManagement from "./pages/Admin/SuperAdmin/ClientManagement";
import SystemAnalytics from "./pages/Admin/SuperAdmin/SystemAnalytics";
import SecurityControl from "./pages/Admin/SuperAdmin/SecurityControl";

/* ===== Admin Pages ===== */
import AdminDashboard from "./pages/Admin/Admin/AdminDashboard";

/* ===== Shared Pages (Both Super Admin & Admin) ===== */
import Orders from "./pages/Admin/Shared/Orders";
import MenuPage from "./pages/Admin/Shared/MenuPage";
import Categories from "./pages/Admin/Shared/Categories";
import TableManagement from "./pages/Admin/Shared/Tables/TableManagement";

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

      {/* ========= ADMIN (Super Admin & Admin) ========= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["superadmin", "admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* Super Admin Dashboard (Restaurant Management) */}
        <Route 
          path="dashboard" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Regular Admin Dashboard */}
        <Route 
          path="admin-dashboard" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Shared Routes */}
        <Route path="orders" element={<Orders />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="categories" element={<Categories />} />
        <Route path="tables" element={<TableManagement />} />

        {/* Restaurant Management (Super Admin Only) */}
        <Route 
          path="restaurants" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <RestaurantManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="restaurants/add" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <AddRestaurant />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="restaurants/edit/:id" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <AddRestaurant />
            </ProtectedRoute>
          } 
        />
        
        {/* View Restaurant (Super Admin Only) */}
        <Route 
          path="restaurants/view/:id" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <RestaurantManagement />
            </ProtectedRoute>
          } 
        />

        {/* Admin Management (Super Admin Only) */}
        <Route 
          path="add-admin" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <AddAdmin />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="admin-management" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <AdminManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="subscriptions" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <SubscriptionManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="project-status" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <ProjectStatus />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="clients" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <ClientManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="analytics" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <SystemAnalytics />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="security" 
          element={
            <ProtectedRoute requiredRole="superadmin">
              <SecurityControl />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* ========= FALLBACK ========= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default App;