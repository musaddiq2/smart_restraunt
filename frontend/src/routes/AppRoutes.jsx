import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// GLOBAL
import Navbar from "../components/Navbar";

// USER PAGES
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";

// ADMIN PAGES
import Dashboard from "../pages/Admin/Dashboard";
import Categories from "../pages/Admin/Categories";
import RestaurantList from "../pages/Admin/RestaurantList";
import AddAdmin from "../pages/Admin/AddAdmin";

// TABLE MODULE
import AddTable from "../pages/Admin/Tables/AddTable";
import TableList from "../pages/Admin/Tables/TableList";
import EditTable from "../pages/Admin/Tables/EditTable";    // 🆕 ADDED
import TableQR from "../pages/Admin/Tables/TableQR";

// LAYOUTS
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../routes/ProtectedRoute";

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
        {/* ADMIN ROUTES */}
        {/* ====================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Redirect /admin → /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />

          {/* RESTAURANT MODULE */}
          <Route path="restaurant" element={<RestaurantList />} />
          <Route path="restaurant/add" element={<AddRestaurant />} />
          <Route path="restaurant/edit/:id" element={<RestaurantList />} />
          {/* ADMIN MANAGEMENT */}
          <Route path="add-admin" element={<AddAdmin />} />

          {/* ====================== */}
          {/* TABLE MODULE */}
          {/* ====================== */}
          <Route path="tables" element={<TableList />} />
          <Route path="tables/add" element={<AddTable />} />
          <Route path="tables/edit/:id" element={<EditTable />} /> {/* 🆕 */}
          <Route path="tables/qr/:id" element={<TableQR />} />
        </Route>

        {/* ====================== */}
        {/* 404 PAGE */}
        {/* ====================== */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-xl font-bold">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
