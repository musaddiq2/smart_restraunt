import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTables, updateTable } from "../../../redux/slices/tableSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTable() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector((state) => state.tables);

  const [tableNumber, setTableNumber] = useState("");
  const [seats, setSeats] = useState("");
  const [status, setStatus] = useState("Available");

  useEffect(() => {
    if (!list.length) dispatch(fetchTables());
  }, [dispatch, list.length]);

  useEffect(() => {
    const table = list.find((t) => t._id === id);
    if (table) {
      setTableNumber(table.tableNumber);
      setSeats(table.seats);
      setStatus(table.status);
    }
  }, [list, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateTable({ id, updatedData: { tableNumber, seats, status } })).unwrap();
    navigate("/admin/tables");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Table</h1>
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

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Update Table</button>
      </form>
    </div>
  );
}
