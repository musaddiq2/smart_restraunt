import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurants,
  deleteRestaurant,
} from "../../../redux/slices/restaurantsSlice";
import AddRestaurantModal from "./AddRestaurant";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function RestaurantManagement() {
  const dispatch = useDispatch();
  const { list = [], loading } = useSelector(
    (state) => state.restaurants || {}
  );

  const [openAdd, setOpenAdd] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const rowsRef = useRef([]);
  rowsRef.current = [];

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (!rowsRef.current.length) return;
    gsap.fromTo(
      rowsRef.current,
      { y: 10, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: "power3.out",
      }
    );
  }, [list]);

  const addRowRef = (el) => {
    if (el && !rowsRef.current.includes(el)) rowsRef.current.push(el);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this restaurant?")) return;
    await dispatch(deleteRestaurant(id));
    dispatch(fetchRestaurants());
  };

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setOpenAdd(true);
  };

  const filtered = useMemo(() => {
    let data = Array.isArray(list) ? [...list] : [];

    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(
        (r) =>
          (r.name || "").toLowerCase().includes(q) ||
          (r.restaurantId || "").toLowerCase().includes(q) ||
          (r.contact || "").toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "All") {
      data = data.filter(
        (r) => (r.type || "").toLowerCase() === typeFilter.toLowerCase()
      );
    }

    if (statusFilter !== "All") {
      data = data.filter(
        (r) => (r.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (sortBy === "az")
      data.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    if (sortBy === "za")
      data.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    if (sortBy === "newest")
      data.sort(
        (a, b) =>
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

    return data;
  }, [list, query, typeFilter, statusFilter, sortBy]);

  return (
    <div className="h-full flex flex-col p-6 gap-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Restaurant Management
        </h1>
        <button
          onClick={() => {
            setEditingRestaurant(null);
            setOpenAdd(true);
          }}
          className="bg-rose-600 hover:bg-rose-700 transition text-white px-5 py-2.5 rounded-lg shadow"
        >
          + Add Restaurant
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-3">
        <input
          placeholder="Search name, ID, contact..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 border rounded-lg flex-1"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="All">All Types</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Both">Both</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="newest">Newest</option>
          <option value="az">Name A → Z</option>
          <option value="za">Name Z → A</option>
        </select>
      </div>

      {/* TABLE AREA (ONLY THIS SCROLLS) */}
      <div className="flex-1 bg-white rounded-lg shadow overflow-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100 text-slate-700 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Restaurant</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  No restaurants found
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr
                  key={r._id}
                  ref={addRowRef}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={r.restaurantImg || "/noimg.png"}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />
                    <div>
                      <div className="font-semibold text-slate-800">
                        {r.name}
                      </div>
                      <div className="text-sm text-slate-500 font-mono">
                        #{r.restaurantId}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{r.type}</td>
                  <td className="p-3">{r.contact || "--"}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        r.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <Link
                      to={`view/${r._id}`}
                      className="p-2 rounded-lg border hover:bg-slate-100"
                    >
                      <Eye size={18} />
                    </Link>
                    <button
                      onClick={() => handleEdit(r)}
                      className="p-2 rounded-lg border hover:bg-slate-100"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="p-2 rounded-lg border hover:bg-red-50 text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AddRestaurantModal
        open={openAdd}
        restaurant={editingRestaurant}
        onClose={() => setOpenAdd(false)}
        onSuccess={() => {
          setOpenAdd(false);
          dispatch(fetchRestaurants());
        }}
      />
    </div>
  );
}
