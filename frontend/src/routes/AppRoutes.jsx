import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// GLOBAL COMPONENTS
import Navbar from "../components/Navbar";

// USER PAGES
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";

// ADMIN PAGES
import Dashboard from "../pages/Admin/Dashboard";
import Categories from "../pages/Admin/Categories";

// RESTAURANT MODULE
import RestaurantManagement from "../pages/Admin/RestaurantManagement";
import AddRestaurant from "../pages/Admin/AddRestaurant";
import EditRestaurant from "../pages/Admin/EditRestaurant";

// ADMIN MANAGEMENT
import AddAdmin from "../pages/Admin/AddAdmin";

// TABLE MODULE
import AddTable from "../pages/Admin/Tables/AddTable";
import TableManagement from "../pages/Admin/Tables/TableManagement";
import EditTable from "../pages/Admin/Tables/EditTable";
import TableQR from "../pages/Admin/Tables/TableQR";

// LAYOUTS & ROUTE GUARDS
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ====================== */}
        {/* USER ROUTES */}
        {/* ====================== */}
        <Route path="/" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ====================== */}
        {/* ADMIN NESTED ROUTES */}
        {/* ====================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Default → /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Dashboard & Categories */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />

          {/* ====================== */}
          {/* RESTAURANT MODULE */}
          {/* ====================== */}
          <Route path="restaurants" element={<RestaurantManagement />} />
          <Route path="restaurants/add" element={<AddRestaurant />} />
          <Route path="restaurants/edit/:id" element={<EditRestaurant />} />

          {/* ====================== */}
          {/* ADMIN / STAFF MODULE */}
          {/* ====================== */}
          <Route path="add-admin" element={<AddAdmin />} />

          {/* ====================== */}
          {/* TABLE MODULE */}
          {/* ====================== */}
          <Route path="tables" element={<TableManagement />} />
          <Route path="tables/add" element={<AddTable />} />
          <Route path="tables/edit/:id" element={<EditTable />} />
          <Route path="tables/qr/:id" element={<TableQR />} />
        </Route>

        {/* ====================== */}
        {/* 404 PAGE */}
        {/* ====================== */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-xl font-bold text-red-600">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
