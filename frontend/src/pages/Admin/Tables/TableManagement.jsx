import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Edit, Plus } from "lucide-react";
import gsap from "gsap";

import { fetchTables, deleteTable } from "../../../redux/slices/tableSlice";
import { fetchRestaurants } from "../../../redux/slices/restaurantsSlice";
import AddTablePage from "./AddTablePage";

// ⭐ IMPORT QR PREVIEW
import QRPreview from "./QRPreview";

export default function TableManagement() {
  const dispatch = useDispatch();
  const tableRef = useRef(null);

  const { list: tables, loading: tableLoading } = useSelector(
    (state) => state.tables
  );
  const { list: restaurants, loading: restaurantLoading } = useSelector(
    (state) => state.restaurants
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTable, setEditTable] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [restaurantObject, setRestaurantObject] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchTables());
  }, [dispatch]);

  useEffect(() => {
    if (selectedRestaurant) {
      const rest = restaurants.find((r) => r._id === selectedRestaurant);
      setRestaurantObject(rest || null);
    } else {
      setRestaurantObject(null);
    }
  }, [selectedRestaurant, restaurants]);

  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    }
  }, [tables]);

const filteredTables = useMemo(() => {
  if (!Array.isArray(tables)) return [];  // FIX
  
  return tables
    .filter((t) =>
      selectedRestaurant ? t.restaurantId === selectedRestaurant : true
    )
    .filter((t) =>
      (t.tableNumber ?? "").toString().includes(search)
    );
}, [tables, selectedRestaurant, search]);



  const openModal = (table = null) => {
    if (!restaurantObject) return;
    setEditTable(table);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 flex flex-col md:flex-row gap-8">

      {/* LEFT SIDE */}
      <div className="flex-1" ref={tableRef}>
        
        {/* Restaurant Dropdown */}
        <div className="mb-5">
          <label className="font-semibold text-gray-700">Choose Restaurant</label>

          <select
            className="p-3 rounded-xl border mt-2 w-full bg-white shadow focus:ring-2 focus:ring-rose-300 outline-none"
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
          >
            <option value="">-- Select Restaurant --</option>
            {!restaurantLoading &&
              restaurants.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
          </select>
        </div>

        {/* Restaurant Preview Card */}
        {restaurantObject && (
          <div className="flex items-center gap-4 bg-white border border-rose-100 p-4 rounded-2xl shadow-md mb-5">
            <img
              src={restaurantObject.image}
              alt=""
              className="w-16 h-16 rounded-xl object-cover border"
            />
            <div>
              <h3 className="text-lg font-bold text-rose-600">
                {restaurantObject.name}
              </h3>
              <p className="text-xs text-gray-500">ID: {restaurantObject._id}</p>
            </div>
          </div>
        )}

        {/* Search + Add Table */}
        <div className="flex justify-between mb-5 gap-3">
          <input
            type="text"
            placeholder="Search table number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-xl border shadow bg-white outline-none focus:ring-2 focus:ring-rose-300"
          />

          <button
            disabled={!selectedRestaurant}
            onClick={() => openModal()}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-white shadow-lg transition ${
              selectedRestaurant
                ? "bg-rose-500 hover:bg-rose-600 hover:scale-105"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <Plus size={18} /> Add Table
          </button>
        </div>

        {/* TABLE LIST */}
        {tableLoading ? (
          <p className="text-gray-600">Loading tables...</p>
        ) : (
          <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-rose-100">
            <table className="min-w-full">
              <thead className="bg-rose-100 text-gray-700">
                <tr>
                  <th className="p-3 border">Table No</th>
                  <th className="p-3 border">Seats</th>
                  <th className="p-3 border">Restaurant</th>
                  <th className="p p-3 border">Table ID</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTables.map((t) => {
                  const rest = restaurants.find((r) => r._id === t.restaurantId);
                  return (
                    <tr
                      key={t._id}
                      onClick={() => setSelectedTable(t)}
                      className="hover:bg-rose-50 cursor-pointer transition"
                    >
                      <td className="p-3 border">{t.tableNumber}</td>
                      <td className="p-3 border">{t.seats}</td>
                      <td className="p-3 border">{rest?.name}</td>
                      <td className="p-3 border">{t.tableId}</td>
                      <td className="p-3 border">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs ${
                            t.status === "Available"
                              ? "bg-green-500"
                              : t.status === "Booked"
                              ? "bg-blue-500"
                              : "bg-red-500"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>

                      <td className="p-3 border flex gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(t);
                          }}
                        >
                          <Edit
                            size={18}
                            className="text-blue-600 hover:scale-110 transition"
                          />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteTable(t._id));
                          }}
                        >
                          <Trash2
                            size={18}
                            className="text-red-500 hover:scale-110 transition"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ⭐ QR PREVIEW PANEL ⭐ */}
      <QRPreview selectedTable={selectedTable} />

      {/* MODAL */}
      {isModalOpen && restaurantObject && (
        <AddTablePage
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editData={editTable}
          onSuccess={() => dispatch(fetchTables())}
          selectedRestaurantData={restaurantObject}
        />
      )}
    </div>
  );
}
