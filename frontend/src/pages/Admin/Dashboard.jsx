import { useEffect, useState } from "react";
import {
  Store,
  Edit,
  Trash2,
  Users,
  ChefHat,
  Table,
  ClipboardList,
  TrendingUp,
  MapPin,
  Clock,
  Search,
  Filter,
  Plus,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

export default function RestaurantDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [stats, setStats] = useState({
    restaurants: 0,
    partners: 0,
    chefs: 0,
    tables: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const API_BASE_URL = "http://localhost:5000/api/v1";

 

  const fetchRestaurants = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/restaurant`
    );

    const data = res.data.restaurants || [];

    setRestaurants(data);

    // dynamically calculate stats
    setStats({
      restaurants: data.length,
      partners: data.filter((x) => x.type === "Partner").length,
      chefs: 18, // can be fetched dynamically later
      tables: 40,
      pendingOrders: 12,
    });
  } catch (error) {
    console.error("Error loading restaurants:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    let filtered = restaurants;

    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (r) => r.status?.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    setFilteredRestaurants(filtered);
  }, [searchTerm, filterStatus, restaurants]);

  const deleteRestaurant = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?"))
      return;
    
    try {
  await axios.delete(
    `${import.meta.env.VITE_API_URL}/restaurant/${id}`
  );

  fetchRestaurants();
} catch (error) {
  console.error("Delete error:", error);
  alert("Error deleting restaurant!");
}

  };

  const handleEdit = (id) => {
    // In a real app with React Router, use: navigate(`/admin/edit-restaurant/${id}`)
    console.log("Edit restaurant:", id);
    window.location.href = `/admin/edit-restaurant/${id}`;
  };

  const handleAddRestaurant = () => {
    // In a real app with React Router, use: navigate('/admin/add-restaurant')
    console.log("Add new restaurant");
    window.location.href = "/admin/add-restaurant";
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Loading Restaurants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center overflow-hidden">
        <div className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl max-w-md">
          <AlertCircle size={64} className="mx-auto text-rose-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchRestaurants();
            }}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-4 bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent mb-2">
                <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-lg">
                  <Store className="text-white" size={36} />
                </div>
                Super Admin Dashboard
              </h1>
              <p className="text-gray-600 ml-1 flex items-center gap-2">
                <TrendingUp size={16} className="text-green-500" />
                Manage all your restaurants in one place
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchRestaurants(true)}
                disabled={refreshing}
                className="px-4 py-3 bg-white/80 backdrop-blur-lg text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw size={20} className={refreshing ? "animate-spin" : ""} />
                Refresh
              </button>

              <button
                onClick={handleAddRestaurant}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Plus size={20} />
                Add Restaurant
              </button>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          <StatCard
            title="Restaurants"
            count={stats.restaurants}
            icon={<Store size={24} />}
            gradient="from-rose-500 to-pink-600"
            trend="+12%"
          />
          <StatCard
            title="Partners"
            count={stats.partners}
            icon={<Users size={24} />}
            gradient="from-purple-500 to-purple-600"
            trend="+8%"
          />
          <StatCard
            title="Chefs"
            count={stats.chefs}
            icon={<ChefHat size={24} />}
            gradient="from-emerald-500 to-green-600"
            trend="+5%"
          />
          <StatCard
            title="Tables"
            count={stats.tables}
            icon={<Table size={24} />}
            gradient="from-indigo-500 to-blue-600"
            trend="+3%"
          />
          <StatCard
            title="Pending Orders"
            count={stats.pendingOrders}
            icon={<ClipboardList size={24} />}
            gradient="from-amber-500 to-orange-600"
            trend="-2%"
          />
        </div>

        {/* SEARCH AND FILTER */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search restaurants by name, location, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredRestaurants.length}</span> of <span className="font-semibold text-gray-900">{restaurants.length}</span> restaurants
          </div>
        </div>

        {/* RESTAURANTS GRID */}
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl">
            <Store size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No restaurants found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first restaurant"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <button
                onClick={handleAddRestaurant}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Add Your First Restaurant
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {filteredRestaurants.map((r, index) => (
              <RestaurantCard
                key={r._id}
                restaurant={r}
                onEdit={() => handleEdit(r._id)}
                onDelete={() => deleteRestaurant(r._id)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------ STAT CARD COMPONENT ------------------ */
function StatCard({ title, count, icon, gradient, trend }) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 overflow-hidden hover:-translate-y-1">
      {/* Gradient Background on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg`}>
            <div className="text-white">{icon}</div>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            trend.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
          }`}>
            {trend}
          </span>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h2 className="text-3xl font-bold text-gray-900">{count}</h2>
        </div>
      </div>
    </div>
  );
}

/* ------------------ RESTAURANT CARD COMPONENT ------------------ */
function RestaurantCard({ restaurant, onEdit, onDelete, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const defaultImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";

  return (
    <div
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-rose-100 to-pink-100">
        <img
          src={imageError ? defaultImage : (restaurant.restaurantImg || defaultImage)}
          alt={restaurant.name}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-md shadow-lg ${
              restaurant.status === "Active" || restaurant.status === "active"
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {restaurant.status || "Active"}
          </span>
        </div>

        {/* Type Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/90 backdrop-blur-md text-gray-800 shadow-lg">
            {restaurant.type || "Standard"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-1">
          {restaurant.name}
        </h2>

        <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
          <MapPin size={16} className="text-rose-500 mt-0.5 flex-shrink-0" />
          <p className="line-clamp-2">{restaurant.address || "No address provided"}</p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Table size={14} className="text-indigo-500" />
            <span>{restaurant.tableCount || 12} Tables</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock size={14} className="text-purple-500" />
            <span>{restaurant.openingHours || "Open Now"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
          >
            <Edit size={16} className="group-hover/btn:rotate-12 transition-transform" />
            Edit
          </button>

          <button
            onClick={onDelete}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
          >
            <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Add keyframes for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Custom scrollbar for the page */
  .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(241, 245, 249, 0.5);
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #f43f5e, #ec4899);
    border-radius: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #e11d48, #db2777);
  }
`;
document.head.appendChild(style);