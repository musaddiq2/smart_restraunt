import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, Edit, Trash2, Search } from "lucide-react";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("az");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
  const BASE_URL = `${API_URL}/restaurant`;

  // 👉 Fetch Restaurants
  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(BASE_URL);
      const data = res.data.restaurants || [];

      setRestaurants(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // 👉 Delete Restaurant
  const deleteRestaurant = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?"))
      return;

    try {
      await axios.delete(`${BASE_URL}/${id}`);
      alert("Restaurant deleted!");
      fetchRestaurants();
    } catch (error) {
      alert("Error deleting restaurant");
      console.error(error);
    }
  };

  // 👉 Edit
  const editRestaurant = (id) => {
    navigate(`/admin/edit-restaurant/${id}`);
  };

  // 👉 Search Filter
  useEffect(() => {
    let results = [...restaurants];

    if (search.trim() !== "") {
      results = results.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting logic
    if (sortType === "az") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "za") {
      results.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortType === "newest") {
      results.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortType === "oldest") {
      results.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    setFiltered(results);
  }, [search, sortType, restaurants]);

  if (loading)
    return <p className="text-center py-10 text-rose-500 font-semibold">Loading Restaurants...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-rose-100 mt-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Store size={24} className="text-rose-600" />
          Restaurant Partner List
        </h2>

        {/* Search box */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search restaurant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-400 outline-none"
          />
        </div>

        {/* Sorting */}
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-400 outline-none"
        >
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-rose-50">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-slate-200">
            {filtered.map((restaurant) => (
              <tr key={restaurant._id} className="hover:bg-rose-50">
                <td className="px-6 py-4 text-rose-600 font-semibold">
                  {restaurant.restaurantId}
                </td>
                <td className="px-6 py-4 font-semibold">{restaurant.name}</td>
                <td className="px-6 py-4">{restaurant.type}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      restaurant.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {restaurant.status || "Active"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    {/* Edit */}
                    <button
                      onClick={() => editRestaurant(restaurant._id)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                    >
                      <Edit size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteRestaurant(restaurant._id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-slate-500 mt-4">
        Showing {filtered.length} Restaurants
      </p>
    </div>
  );
}
