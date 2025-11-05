// src/App.jsx
import React from "react";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Menu from "./pages/Menu";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0d17] via-[#111827] to-[#1f2937] text-white">
      {/* 🏷️ Golden Spoon theme */}
      <Header />
      <main className="p-6">
        <h1 className="text-4xl font-serif text-center text-yellow-400 mb-8">
          The Golden Spoon
        </h1>
        <Menu />
      </main>
      <Footer />
    </div>
  );
}

export default App;
