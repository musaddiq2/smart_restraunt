import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store,
  ShoppingBag,
  Utensils,
  Table,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    restaurants: 0,
    pendingOrders: 0,
    totalOrders: 0,
    menuItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      // Fetch assigned restaurants
      const restaurantsResponse = await fetch(`${API_BASE_URL}/admin/my-restaurants`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (restaurantsResponse.ok) {
        const restaurantsData = await restaurantsResponse.json();
        if (restaurantsData.success) {
          setRestaurants(restaurantsData.restaurants || []);
        }
      }

      // Fetch orders
      const ordersResponse = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        if (ordersData.success) {
          const allOrders = ordersData.orders || [];
          setOrders(allOrders);
          
          // Filter orders for assigned restaurants
          const restaurantIds = restaurants.map(r => r._id);
          const filteredOrders = allOrders.filter(order => 
            restaurantIds.includes(order.restaurantId) || 
            restaurantIds.some(rid => order.tableNumber?.includes(rid))
          );
          
          setStats({
            restaurants: restaurants.length,
            pendingOrders: filteredOrders.filter(o => o.status === "Pending").length,
            totalOrders: filteredOrders.length,
            menuItems: 0, // Will be fetched separately if needed
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl max-w-md">
          <AlertCircle size={64} className="mx-auto text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Store className="text-white" size={36} />
            </div>
            Admin Dashboard
          </h1>
          <p className="text-gray-600 ml-1 flex items-center gap-2">
            <TrendingUp size={16} className="text-green-500" />
            Manage your assigned restaurants
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Assigned Restaurants"
            count={stats.restaurants}
            icon={<Store size={24} />}
            gradient="from-blue-500 to-blue-600"
            onClick={() => navigate("/admin/restaurants")}
          />
          <StatCard
            title="Pending Orders"
            count={stats.pendingOrders}
            icon={<ShoppingBag size={24} />}
            gradient="from-amber-500 to-orange-600"
            onClick={() => navigate("/admin/orders")}
          />
          <StatCard
            title="Total Orders"
            count={stats.totalOrders}
            icon={<TrendingUp size={24} />}
            gradient="from-green-500 to-emerald-600"
            onClick={() => navigate("/admin/orders")}
          />
          <StatCard
            title="Menu Items"
            count={stats.menuItems}
            icon={<Utensils size={24} />}
            gradient="from-purple-500 to-purple-600"
            onClick={() => navigate("/admin/menu")}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <QuickActionCard
            title="Manage Orders"
            description="View and manage all orders"
            icon={<ShoppingBag size={32} />}
            gradient="from-amber-500 to-orange-600"
            onClick={() => navigate("/admin/orders")}
          />
          <QuickActionCard
            title="Manage Menu"
            description="Create and update menu items"
            icon={<Utensils size={32} />}
            gradient="from-purple-500 to-purple-600"
            onClick={() => navigate("/admin/menu")}
          />
          <QuickActionCard
            title="Manage Tables"
            description="Configure tables and QR codes"
            icon={<Table size={32} />}
            gradient="from-indigo-500 to-blue-600"
            onClick={() => navigate("/admin/tables")}
          />
        </div>

        {/* Assigned Restaurants */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Restaurants</h2>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>

          {restaurants.length === 0 ? (
            <div className="text-center py-12">
              <Store size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No restaurants assigned</h3>
              <p className="text-gray-500">Contact Super Admin to get restaurant access</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant._id}
                  restaurant={restaurant}
                  onClick={() => navigate(`/admin/restaurants/${restaurant._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Stat Card Component */
function StatCard({ title, count, icon, gradient, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`group relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 overflow-hidden hover:-translate-y-1 cursor-pointer`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg`}>
            <div className="text-white">{icon}</div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h2 className="text-3xl font-bold text-gray-900">{count}</h2>
        </div>
      </div>
    </div>
  );
}

/* Quick Action Card */
function QuickActionCard({ title, description, icon, gradient, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`group relative bg-gradient-to-br ${gradient} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-white cursor-pointer hover:scale-105`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          {icon}
        </div>
        <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-white/80">{description}</p>
    </div>
  );
}

/* Restaurant Card */
function RestaurantCard({ restaurant, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 cursor-pointer hover:-translate-y-1"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
          <Store size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{restaurant.name}</h3>
          <p className="text-xs text-gray-500">{restaurant.address || "No address"}</p>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold ${
            restaurant.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {restaurant.status || "Active"}
          </span>
        </div>
      </div>
    </div>
  );
}

