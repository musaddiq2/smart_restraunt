import { useEffect, useState } from "react";
import { Lock, Unlock, RefreshCcw, Plus, X, Shield, User, Crown, Search, Filter, Mail, Building2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Manager",
    restaurantId: "",
  });

  /* ================= FETCH ================= */
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:5000/api/v1/admins");
      const data = await response.json();
      
      // Mock data for demonstration
      const mockAdmins = [
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "Owner",
          status: "Active",
          restaurant: { _id: "r1", name: "The Golden Spoon" }
        },
        {
          _id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "Manager",
          status: "Active",
          restaurant: { _id: "r2", name: "Sushi Paradise" }
        },
        {
          _id: "3",
          name: "Mike Johnson",
          email: "mike@example.com",
          role: "Manager",
          status: "Blocked",
          restaurant: { _id: "r3", name: "Pizza Corner" }
        },
      ];
      
      setAdmins(mockAdmins);
      setFilteredAdmins(mockAdmins);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    try {
      // Mock data for demonstration
      const mockRestaurants = [
        { _id: "r1", name: "The Golden Spoon" },
        { _id: "r2", name: "Sushi Paradise" },
        { _id: "r3", name: "Pizza Corner" },
        { _id: "r4", name: "Burger House" },
      ];
      setRestaurants(mockRestaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchRestaurants();
  }, []);

  // Filter admins based on search and filters
  useEffect(() => {
    let filtered = admins;

    if (searchTerm) {
      filtered = filtered.filter(
        (admin) =>
          admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== "all") {
      filtered = filtered.filter((admin) => admin.role === filterRole);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((admin) => admin.status === filterStatus);
    }

    setFilteredAdmins(filtered);
  }, [searchTerm, filterRole, filterStatus, admins]);

  /* ================= ACTIONS ================= */
  const addAdmin = async () => {
    if (!form.name || !form.email || !form.restaurantId) {
      alert("Please fill all required fields");
      return;
    }

    try {
      // Replace with actual API call
      const newAdmin = {
        _id: Date.now().toString(),
        name: form.name,
        email: form.email,
        role: form.role,
        status: "Active",
        restaurant: restaurants.find((r) => r._id === form.restaurantId),
      };

      setAdmins([...admins, newAdmin]);
      setOpenAdd(false);
      setForm({ name: "", email: "", role: "Manager", restaurantId: "" });
    } catch (error) {
      console.error("Error adding admin:", error);
      alert("Failed to add admin");
    }
  };

  const changeRole = async (id, role) => {
    try {
      const updatedAdmins = admins.map((admin) =>
        admin._id === id ? { ...admin, role } : admin
      );
      setAdmins(updatedAdmins);
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Blocked" : "Active";
    try {
      const updatedAdmins = admins.map((admin) =>
        admin._id === id ? { ...admin, status: newStatus } : admin
      );
      setAdmins(updatedAdmins);
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const resetPassword = async (id) => {
    if (!window.confirm("Reset password for this admin?")) return;
    
    try {
      // Replace with actual API call
      alert("Password reset email sent successfully!");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to send reset email");
    }
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Loading Admins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-4 bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent mb-2">
                <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-lg">
                  <Shield className="text-white" size={36} />
                </div>
                Admin Management
              </h1>
              <p className="text-gray-600 ml-1 flex items-center gap-2">
                <User size={16} className="text-rose-500" />
                Manage administrators and permissions
              </p>
            </div>

            <button
              onClick={() => setOpenAdd(true)}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 self-start md:self-auto"
            >
              <Plus size={20} />
              Add Admin
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Admins"
            count={admins.length}
            icon={<User size={24} />}
            gradient="from-blue-500 to-blue-600"
          />
          <StatCard
            title="Active"
            count={admins.filter((a) => a.status === "Active").length}
            icon={<CheckCircle2 size={24} />}
            gradient="from-green-500 to-emerald-600"
          />
          <StatCard
            title="Blocked"
            count={admins.filter((a) => a.status === "Blocked").length}
            icon={<AlertCircle size={24} />}
            gradient="from-red-500 to-rose-600"
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-600" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="Owner">Owner</option>
                <option value="Manager">Manager</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredAdmins.length}</span> of <span className="font-semibold text-gray-900">{admins.length}</span> admins
          </div>
        </div>

        {/* Admin Cards Grid */}
        {filteredAdmins.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl">
            <Shield size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No admins found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
            {filteredAdmins.map((admin, index) => (
              <AdminCard
                key={admin._id}
                admin={admin}
                index={index}
                onChangeRole={changeRole}
                onToggleStatus={toggleStatus}
                onResetPassword={resetPassword}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Admin Modal */}
      {openAdd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Plus size={24} />
                  Add New Admin
                </h2>
                <button
                  onClick={() => setOpenAdd(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  placeholder="Enter admin name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="Manager">Manager</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Assign Restaurant *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer"
                  value={form.restaurantId}
                  onChange={(e) => setForm({ ...form, restaurantId: e.target.value })}
                >
                  <option value="">Select a restaurant</option>
                  {restaurants.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 bg-gray-50 rounded-b-2xl border-t">
              <button
                onClick={() => setOpenAdd(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={addAdmin}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Create Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Stat Card Component */
function StatCard({ title, count, icon, gradient }) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 overflow-hidden hover:-translate-y-1">
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

/* Admin Card Component */
function AdminCard({ admin, index, onChangeRole, onToggleStatus, onResetPassword }) {
  return (
    <div
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Header with gradient based on role */}
      <div className={`p-5 ${admin.role === "Owner" ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gradient-to-r from-blue-400 to-indigo-500"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              {admin.role === "Owner" ? (
                <Crown size={24} className="text-amber-500" />
              ) : (
                <User size={24} className="text-blue-500" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">{admin.name}</h2>
              <p className="text-sm text-white/90 flex items-center gap-1">
                <Mail size={14} />
                {admin.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {/* Restaurant */}
        <div className="flex items-center gap-2 text-sm">
          <Building2 size={16} className="text-gray-500" />
          <span className="font-semibold text-gray-700">Restaurant:</span>
          <span className="text-gray-600">{admin.restaurant?.name || "Not Assigned"}</span>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Role:</span>
          <select
            value={admin.role}
            onChange={(e) => onChangeRole(admin._id, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <option value="Owner">Owner</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {/* Status Badge */}
        <div>
          <span
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
              admin.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {admin.status === "Active" ? (
              <CheckCircle2 size={14} />
            ) : (
              <AlertCircle size={14} />
            )}
            {admin.status}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <button
            onClick={() => onToggleStatus(admin._id, admin.status)}
            className={`flex-1 p-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              admin.status === "Blocked"
                ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
            }`}
            title={admin.status === "Blocked" ? "Unblock Admin" : "Block Admin"}
          >
            {admin.status === "Blocked" ? (
              <>
                <Unlock size={16} />
                Unblock
              </>
            ) : (
              <>
                <Lock size={16} />
                Block
              </>
            )}
          </button>

          <button
            onClick={() => onResetPassword(admin._id)}
            className="flex-1 p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2 border border-blue-200"
            title="Reset Password"
          >
            <RefreshCcw size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// Add keyframes
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

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`;
document.head.appendChild(style);