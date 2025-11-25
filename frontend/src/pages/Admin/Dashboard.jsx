import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, Edit, Trash2, Users, ChefHat, Table, ClipboardList } from "lucide-react";

export default function RestaurantDashboard() {
    const [restaurants, setRestaurants] = useState([]);
    const [stats, setStats] = useState({
        restaurants: 0,
        partners: 0,
        chefs: 0,
        tables: 0,
        pendingOrders: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch restaurants
    const fetchRestaurants = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/restaurants");
            const data = res.data.restaurants || [];
            setRestaurants(data);

            setStats({
                restaurants: data.length,
                partners: data.length,
                chefs: 18,
                tables: 40,
                pendingOrders: 12
            });
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const deleteRestaurant = async (id) => {
        if (!window.confirm("Are you sure you want to delete this restaurant?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/v1/restaurants/${id}`);
            fetchRestaurants();
        } catch (error) {
            console.error(error);
            alert("Error deleting restaurant");
        }
    };

    if (loading) {
        return <p className="text-center py-20 text-lg font-medium">Loading Restaurants...</p>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* ---------- HEADER ---------- */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                    <Store className="text-orange-500" size={28} /> Restaurant Dashboard
                </h1>
            </div>

            {/* ---------- STATS ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                <StatCard title="Restaurants" count={stats.restaurants} icon={<Store />} color="orange" />
                <StatCard title="Partners" count={stats.partners} icon={<Users />} color="blue" />
                <StatCard title="Chefs" count={stats.chefs} icon={<ChefHat />} color="green" />
                <StatCard title="Tables" count={stats.tables} icon={<Table />} color="purple" />
                <StatCard title="Pending Orders" count={stats.pendingOrders} icon={<ClipboardList />} color="red" />
            </div>

            {/* ---------- RESTAURANT CARDS ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((r) => (
                    <div
                        key={r._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
                    >
                        <img
                            src={r.restaurantImg || "/placeholder.png"}
                            alt={r.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">{r.name}</h2>
                            <p className="text-sm text-gray-500 mb-2">{r.type}</p>
                            <p className="text-sm text-gray-600">{r.address || "No address provided"}</p>

                            <div className="flex items-center justify-between mt-4">
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                        r.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {r.status || "Active"}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/admin/edit-restaurant/${r._id}`)}
                                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                                    >
                                        <Edit size={16} />
                                    </button>

                                    <button
                                        onClick={() => deleteRestaurant(r._id)}
                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* -------------------- STAT CARD COMPONENT -------------------- */
function StatCard({ title, count, icon, color }) {
    return (
        <div
            className={`p-4 bg-white rounded-xl shadow flex items-center justify-between border-l-4 border-${color}-500 hover:shadow-lg transition`}
        >
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h2 className="text-2xl font-bold text-gray-800">{count}</h2>
            </div>
            <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>{icon}</div>
        </div>
    );
}
