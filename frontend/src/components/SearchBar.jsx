import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ placeholder }) {
  return (
    <div className="bg-white shadow-sm rounded-full px-4 py-2 flex items-center gap-3">
      <FaSearch className="text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full outline-none text-sm text-gray-700"
      />
    </div>
  );
}
