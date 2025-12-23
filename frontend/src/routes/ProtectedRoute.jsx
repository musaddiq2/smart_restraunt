import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ⛔ If not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is blocked
  if (user.status === "Blocked") {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // 🚫 If logged in but doesn't have required role
  if (requiredRole && user.role !== requiredRole) {
    // Redirect based on role
    if (user.role === "superadmin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === "admin") {
      return <Navigate to="/admin/admin-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Check if user has one of the allowed roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role
    if (user.role === "superadmin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === "admin") {
      return <Navigate to="/admin/admin-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // ✅ If authorized, show the page
  return children;
}
