import React from "react";
import { Routes, Route } from "react-router-dom";

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
<<<<<<< HEAD
import Restaurant from "./pages/Admin/RestaurantManagement.jsx";
import TableList from "./pages/Admin/Tables/TableList.jsx";
=======
import AddRestaurant from "./pages/Admin/AddRestaurant.jsx";   // ⭐ NEW
import MenuPage from "./pages/Admin/MenuPage.jsx";


>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63
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
<<<<<<< HEAD
        
=======
        <Route path="menu" element={<MenuPage />} />

>>>>>>> 41e523eabd298ae0e6b19ab87bbd04ad6a8c2c63

        {/* ⭐ NEW ROUTE */}
        <Route path="restaurant" element={<Restaurant />} />
        <Route path="tables" element={<TableList />} />
      </Route>
    </Routes>
  );
}
