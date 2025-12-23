import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTable } from "../../../../redux/slices/tableSlice";
import { useNavigate } from "react-router-dom";

export default function AddTable() {
  const [tableNumber, setTableNumber] = useState("");
  const [seats, setSeats] = useState("");
  const [status, setStatus] = useState("Available");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addTable({ tableNumber, seats, status })).unwrap();
      navigate("/admin/tables");
    } catch (err) {
      alert(err || "Failed to add");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add Table</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <label className="block mb-2">Table Number</label>
        <input type="number" value={tableNumber} onChange={(e)=>setTableNumber(e.target.value)} className="w-full border p-2 mb-4" required />

        <label className="block mb-2">Seats</label>
        <input type="number" value={seats} onChange={(e)=>setSeats(e.target.value)} className="w-full border p-2 mb-4" required />

        <label className="block mb-2">Status</label>
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full border p-2 mb-6">
          <option>Available</option>
          <option>Booked</option>
          <option>Occupied</option>
        </select>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Save Table</button>
      </form>
    </div>
  );
}
