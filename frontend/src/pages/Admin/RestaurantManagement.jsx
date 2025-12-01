import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { Store, Edit, Trash2, Plus, Search, X } from "lucide-react";

// Redux actions
import {
  fetchRestaurants,
  deleteRestaurant,
} from "../../redux/slices/restaurantsSlice.js";

// Import Add Restaurant Modal UI (converted from your AddRestaurant.jsx)
import AddRestaurantModal from "../../components/AddRestaurantModal.jsx";

export default function RestaurantManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list = [], loading, error } =
    useSelector((state) => state.restaurant || {});
  const restaurants = Array.isArray(list) ? list : [];

  // Debug: Log restaurants data
  useEffect(() => {
    console.log("Restaurants in component:", restaurants);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [restaurants, loading, error]);

  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false); // 🔥 NEW: Modal State

  // 🔥 Fetch on Load
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // 🔍 Filter - Initialize and update filtered when restaurants or search changes
  useEffect(() => {
    if (!restaurants || restaurants.length === 0) {
      setFiltered([]);
      return;
    }

    if (!search || search.trim() === "") {
      setFiltered(restaurants);
      return;
    }

    const term = search.toLowerCase();
    const results = restaurants.filter((r) => {
      return (
        (r.name || "").toLowerCase().includes(term) ||
        (r.type || "").toLowerCase().includes(term) ||
        (r.restaurantId || "").toString().includes(search) ||
        (r.contact || "").toString().includes(search) ||
        (r.email || "").toLowerCase().includes(term)
      );
    });

    setFiltered(results);
  }, [search, restaurants]);

  // 🗑 Delete Restaurant (Redux)
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    dispatch(deleteRestaurant(id));
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-restaurant/${id}`);
  };

  if (loading)
    return <p className="text-center py-10">Loading Restaurants...</p>;

  if (error)
    return <p className="text-center py-10 text-red-600">Error: {error.message || error}</p>;

  if (!restaurants || restaurants.length === 0)
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Store className="text-rose-600" size={30} />
            Restaurant List
          </h1>
          <button
            onClick={() => setOpenModal(true)}
            className="px-5 py-2.5 bg-rose-600 text-white font-semibold rounded-xl shadow hover:bg-rose-700 transition-all flex items-center gap-2"
          >
            <Plus size={20} /> Add Restaurant
          </button>
        </div>
        <div className="bg-white p-12 rounded-2xl shadow-xl border text-center">
          <p className="text-gray-500 text-lg">No restaurants found. Add your first restaurant!</p>
        </div>
        {openModal && (
          <AddRestaurantModal
            onClose={() => setOpenModal(false)}
            onSuccess={() => {
              setOpenModal(false);
              dispatch(fetchRestaurants());
            }}
          />
        )}
      </div>
    );

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Store className="text-rose-600" size={30} />
          Restaurant List
        </h1>

        <button
          onClick={() => setOpenModal(true)} // 🔥 OPEN MODAL
          className="px-5 py-2.5 bg-rose-600 text-white font-semibold rounded-xl shadow 
                    hover:bg-rose-700 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Add Restaurant
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search restaurants..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 
                                focus:ring-2 focus:ring-rose-500 focus:border-rose-500 
                                shadow-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Store size={22} className="text-rose-600" />
          Restaurant Partner List
        </h2>

        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <Th>#ID</Th>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>Mobile</Th>
                <Th>Email</Th>
                <Th>Status</Th>
                <Th className="text-center">Actions</Th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filtered.map((data) => (
                <tr key={data._id} className="hover:bg-rose-50/40 transition">
                  <Td>{data.restaurantId}</Td>

                  <Td>
                    <img
                      src={data.restaurantImg}
                      className="h-14 w-14 rounded-md object-cover border"
                      alt=""
                    />
                  </Td>

                  <Td className="font-semibold">{data.name}</Td>
                  <Td>{data.type}</Td>
                  <Td>{data.contact || "--"}</Td>
                  <Td>{data.email || "--"}</Td>

                  <Td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${data.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {data.status || "Active"}
                    </span>
                  </Td>

                  <Td className="text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(data._id)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(data._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Showing {filtered.length} restaurants
        </p>
      </div>

      {/* 🔥 ADD RESTAURANT MODAL COMPONENT */}
      {openModal && (
        <AddRestaurantModal
          onClose={() => {
            setOpenModal(false);
          }}
          onSuccess={async () => {
            setOpenModal(false);
            // Refresh restaurants list after successful addition
            await dispatch(fetchRestaurants());
            console.log("Restaurants list refreshed");
          }}
        />
      )}
    </div>
  );
}

/* ------------------- COMPONENTS ------------------- */

function Th({ children, className = "" }) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase ${className}`}
    >
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td className={`px-6 py-4 text-sm text-gray-700 ${className}`}>{children}</td>
  );
}
