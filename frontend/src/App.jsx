// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./pages/Menu";
import Auth from "./pages/Auth";
import Login from "./pages/Login";  
import Register from "./pages/Register";      
// import Cart from "./pages/Cart"; // optional
import Home from "./pages/Home"; // keep or create a simple Home page

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
         <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </>
  );
}
