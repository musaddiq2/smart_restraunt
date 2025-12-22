import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ⛔ If not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 If logged in but doesn't have required role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // ✅ If authorized, show the page
  return children;
}
