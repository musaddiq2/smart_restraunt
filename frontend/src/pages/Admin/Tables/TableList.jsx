import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTables,
  addTable,
  updateTable,
  deleteTable,
} from "../../../redux/slices/tableSlice";

import { Plus, Edit2, Trash2 } from "lucide-react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TableList() {
  const dispatch = useDispatch();
  const { list = [] } = useSelector((state) => state.tables);

  // RESTAURANT LIST
  const [restaurants, setRestaurants] = useState([]);

  // LOADER
  const [loadingRestaurant, setLoadingRestaurant] = useState(false);

  // FORM
  const [tableNumber, setTableNumber] = useState("");
  const [seats, setSeats] = useState("");
  const [status, setStatus] = useState("Available");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantId, setRestaurantId] = useState("");

  // VALIDATION
  const [restaurantError, setRestaurantError] = useState("");

  // MODALS
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingTable, setEditingTable] = useState(null);

  // SEARCH
  const [search, setSearch] = useState("");

  // SELECTED FOR QR PREVIEW
  const [selectedTable, setSelectedTable] = useState(null);

  // FETCH ALL TABLES
  useEffect(() => {
    dispatch(fetchTables());
    fetchRestaurantList();
  }, []);

  // FETCH ALL RESTAURANTS FOR DROPDOWN
  const fetchRestaurantList = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/restaurants");
      const data = await res.json();
      setRestaurants(data);
    } catch (e) {
      console.log("Restaurant list fetch failed");
    }
  };

  // AUTO-FETCH RESTAURANT NAME
  const fetchRestaurantName = async (id) => {
    if (!id) {
      setRestaurantName("");
      return;
    }

    setLoadingRestaurant(true);
    setRestaurantError("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/restaurants/find/${id}`
      );

      if (!res.ok) {
        setRestaurantName("");
        setRestaurantError("❌ Invalid Restaurant ID");
        setLoadingRestaurant(false);
        return;
      }

      const data = await res.json();
      setRestaurantName(data.name);
      setRestaurantError("");
    } catch (err) {
      setRestaurantName("");
      setRestaurantError("❌ Could not find Restaurant");
    }

    setLoadingRestaurant(false);
  };

  const openAddModal = () => {
    setEditingTable(null);
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setTableNumber("");
    setSeats("");
    setStatus("Available");
    setRestaurantName("");
    setRestaurantId("");
    setRestaurantError("");
  };

  const handleSave = () => {
    if (restaurantError) {
      toast.error("Please enter a valid Restaurant ID");
      return;
    }

    const data = {
      tableNumber,
      seats,
      status,
      restaurantName,
      restaurantId,
    };

    if (editingTable) {
      dispatch(updateTable({ id: editingTable._id, data }))
        .unwrap()
        .then(() => {
          toast.success("Table updated successfully!");
          setShowModal(false);
        })
        .catch(() => toast.error("Failed to update table"));
    } else {
      dispatch(addTable(data))
        .unwrap()
        .then(() => {
          toast.success("Table added successfully!");
          setShowModal(false);
        })
        .catch(() => toast.error("Failed to add table"));
    }
  };

  const handleEditClick = (table) => {
    setEditingTable(table);
    setTableNumber(table.tableNumber);
    setSeats(table.seats);
    setStatus(table.status);
    setRestaurantName(table.restaurantName || "");
    setRestaurantId(table.restaurantId || "");
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTable(deleteId))
      .unwrap()
      .then(() => toast.success("Table deleted successfully!"))
      .catch(() => toast.error("Delete failed"));

    setDeleteId(null);
  };

  const filtered = list.filter((tbl) =>
    tbl.tableNumber.toString().includes(search)
  );

  const qrValue = (tbl) =>
    `https://yourdomain.com/menu/${tbl.restaurantId}/${tbl._id}`;

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2500} />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Table Management</h1>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
        >
          <Plus size={18} /> Add Table
        </button>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="grid grid-cols-12 gap-6">
        {/* TABLE LIST */}
        <div className="col-span-12 lg:col-span-8">
          <div className="mb-6">
            <input
              placeholder="Search table number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 text-slate-600 text-sm uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Table No</th>
                  <th className="px-6 py-3 text-left">Seats</th>
                  <th className="px-6 py-3 text-left">Restaurant</th>
                  <th className="px-6 py-3 text-left">Restaurant ID</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="text-slate-700">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-500">
                      No tables found.
                    </td>
                  </tr>
                )}

                {filtered.map((table) => (
                  <tr
                    key={table._id}
                    className="hover:bg-green-50 border-b cursor-pointer"
                    onClick={() => setSelectedTable(table)}
                  >
                    <td className="px-6 py-4">{table.tableNumber}</td>
                    <td className="px-6 py-4">{table.seats}</td>
                    <td className="px-6 py-4">{table.restaurantName || "—"}</td>
                    <td className="px-6 py-4">{table.restaurantId || "—"}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          table.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : table.status === "Booked"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {table.status}
                      </span>
                    </td>

                    <td
                      className="px-6 py-4 flex gap-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleEditClick(table)}
                        className="p-2 rounded-full hover:bg-blue-50 text-blue-600"
                      >
                        <Edit2 size={18} />
                      </button>

                      <button
                        onClick={() => setDeleteId(table._id)}
                        className="p-2 rounded-full hover:bg-red-50 text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QR PREVIEW */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-lg border p-6 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-3">QR Preview</h2>

            <div className="flex-1 flex items-center justify-center">
              {!selectedTable ? (
                <div className="text-center text-slate-500">
                  <p>Select a table to preview its QR</p>
                  <p className="text-xs mt-1">Click any row on the left</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-xl shadow border mb-3">
                    <QRCode value={qrValue(selectedTable)} size={180} />
                  </div>

                  <p className="text-sm text-slate-600 mb-4">
                    Scan to view menu & ordering
                  </p>

                  <a
                    href={qrValue(selectedTable)}
                    download={`table-${selectedTable.tableNumber}-qr.png`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
                  >
                    Download QR
                  </a>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-4">
              Tip: You can edit a table using the edit button on the table row.
            </p>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl w-[350px] shadow-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-xl font-semibold mb-3">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this table?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl w-[450px] shadow-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingTable ? "Edit Table" : "Add Table"}
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Table Number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border"
              />

              <input
                placeholder="Seats"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border"
              />

              {/* DROPDOWN: AUTO-FILL RESTAURANT ID */}
              <select
                className="w-full px-4 py-2 rounded-lg border"
                onChange={(e) => {
                  const r = restaurants.find(
                    (x) => x.restaurantId === e.target.value
                  );
                  setRestaurantId(r?.restaurantId || "");
                  setRestaurantName(r?.name || "");
                  setRestaurantError("");
                }}
              >
                <option value="">Select Restaurant</option>

                {restaurants.map((r) => (
                  <option key={r._id} value={r.restaurantId}>
                    {r.name} ({r.restaurantId})
                  </option>
                ))}
              </select>

              {/* RESTAURANT ID INPUT */}
              <div className="relative">
                <input
                  placeholder="Restaurant ID"
                  value={restaurantId}
                  onChange={(e) => {
                    setRestaurantId(e.target.value);
                    fetchRestaurantName(e.target.value);
                  }}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    restaurantError ? "border-red-500" : ""
                  }`}
                />

                {loadingRestaurant && (
                  <div className="absolute right-3 top-3">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* ERROR MESSAGE */}
              {restaurantError && (
                <p className="text-sm text-red-600">{restaurantError}</p>
              )}

              {/* AUTO-FILLED RESTAURANT NAME */}
              <input
                placeholder="Restaurant Name"
                value={restaurantName}
                readOnly
                className="w-full px-4 py-2 rounded-lg border bg-gray-100"
              />

              <select
                className="w-full px-4 py-2 rounded-lg border"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Available</option>
                <option>Booked</option>
                <option>Occupied</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={!!restaurantError}
                className={`px-4 py-2 rounded-lg text-white shadow 
                  ${
                    restaurantError
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600"
                  }`}
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
