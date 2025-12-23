import { useEffect, useState } from "react";
import { Lock, Unlock, RefreshCcw, Plus, X, Shield, User, Search, Filter, Mail, AlertCircle, CheckCircle2, Building2, Settings, Trash2 } from "lucide-react";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openPermissions, setOpenPermissions] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [assignForm, setAssignForm] = useState({ restaurantId: "" });
  const [permissionsForm, setPermissionsForm] = useState({
    canManageMenus: true,
    canManageOrders: true,
    canManageTables: true,
    canAccessDashboard: true
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  /* ================= FETCH ================= */
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
      
      if (!token) {
        console.error("No token found in localStorage");
        alert("Please login again. No authentication token found.");
        return;
      }

      console.log("Fetching admins from:", `${API_BASE_URL}/admin`);
      
      const response = await fetch(`${API_BASE_URL}/admin`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Admin fetch response:", { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.message || `Failed to fetch admins: ${response.status} ${response.statusText}`);
      }
      
      if (data.success && data.admins) {
        console.log("Admins fetched successfully:", data.admins.length);
        setAdmins(data.admins);
        setFilteredAdmins(data.admins);
      } else {
        console.warn("Unexpected response format:", data);
        setAdmins([]);
        setFilteredAdmins([]);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      alert(`Failed to load admins: ${error.message}. Please check console for details.`);
      setAdmins([]);
      setFilteredAdmins([]);
    } finally {
      setLoading(false);
    }
  };


  const fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
      
      const response = await fetch(`${API_BASE_URL}/restaurant`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setRestaurants(data);
        } else if (data.restaurants) {
          setRestaurants(data.restaurants);
        }
      }
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

    // Note: All admins have role "admin", so role filter is not needed
    // Keeping for future use if roles are expanded

    if (filterStatus !== "all") {
      filtered = filtered.filter((admin) => admin.status === filterStatus);
    }

    setFilteredAdmins(filtered);
  }, [searchTerm, filterRole, filterStatus, admins]);

  /* ================= ACTIONS ================= */
  const addAdmin = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all required fields (Name, Email, and Password)");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
      
      const response = await fetch(`${API_BASE_URL}/admin/register-admin`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add admin");
      }

      if (data.success) {
        alert("✅ Admin added successfully!");
        setOpenAdd(false);
        setForm({ name: "", email: "", password: "", role: "admin" });
        // Refresh the admin list
        await fetchAdmins();
      } else {
        throw new Error(data.message || "Failed to add admin");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      alert(error.message || "Failed to add admin. Please try again.");
    }
  };

  const changeRole = async (id, role) => {
    // Note: Role changing might not be needed if all admins have the same role
    // Keeping this for UI consistency but it doesn't call API
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
    
    if (!window.confirm(`Are you sure you want to ${newStatus === "Blocked" ? "block" : "unblock"} this admin?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
      
      const response = await fetch(`${API_BASE_URL}/admin/${id}/status`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update admin status");
      }

      if (data.success) {
        // Refresh the admin list to get updated data
        await fetchAdmins();
        alert(`Admin ${newStatus === "Blocked" ? "blocked" : "unblocked"} successfully!`);
      } else {
        throw new Error(data.message || "Failed to update admin status");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      alert(error.message || "Failed to update admin status. Please try again.");
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

  const assignRestaurant = async () => {
    if (!assignForm.restaurantId || !selectedAdmin) {
      alert("Please select a restaurant");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
      
      const response = await fetch(`${API_BASE_URL}/admin/assign-restaurant`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminId: selectedAdmin._id,
          restaurantId: assignForm.restaurantId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to assign restaurant");
      }

      if (data.success) {
        alert("✅ Restaurant assigned successfully!");
        setOpenAssign(false);
        setAssignForm({ restaurantId: "" });
        setSelectedAdmin(null);
        await fetchAdmins();
      }
    } catch (error) {
      console.error("Error assigning restaurant:", error);
      alert(error.message || "Failed to assign restaurant");
    }
  };

  const removeRestaurant = async (adminId, restaurantId) => {
    if (!window.confirm("Remove this restaurant assignment?")) return;

    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
      
      const response = await fetch(`${API_BASE_URL}/admin/remove-restaurant`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminId,
          restaurantId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove assignment");
      }

      if (data.success) {
        alert("✅ Restaurant assignment removed!");
        await fetchAdmins();
      }
    } catch (error) {
      console.error("Error removing assignment:", error);
      alert(error.message || "Failed to remove assignment");
    }
  };

  const updatePermissions = async () => {
    if (!selectedAdmin) return;

    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
      
      const response = await fetch(`${API_BASE_URL}/admin/${selectedAdmin._id}/permissions`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ permissions: permissionsForm }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update permissions");
      }

      if (data.success) {
        alert("✅ Permissions updated successfully!");
        setOpenPermissions(false);
        setSelectedAdmin(null);
        await fetchAdmins();
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      alert(error.message || "Failed to update permissions");
    }
  };

  const openAssignModal = (admin) => {
    setSelectedAdmin(admin);
    setAssignForm({ restaurantId: "" });
    setOpenAssign(true);
  };

  const openPermissionsModal = (admin) => {
    setSelectedAdmin(admin);
    setPermissionsForm(admin.permissions || {
      canManageMenus: true,
      canManageOrders: true,
      canManageTables: true,
      canAccessDashboard: true
    });
    setOpenPermissions(true);
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

            <div className="flex items-center gap-3">
              <button
                onClick={fetchAdmins}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                title="Refresh admin list"
              >
                <RefreshCcw size={18} />
                Refresh
              </button>
              <button
                onClick={() => setOpenAdd(true)}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 self-start md:self-auto"
              >
                <Plus size={20} />
                Add Admin
              </button>
            </div>
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
        {filteredAdmins.length === 0 && !loading ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl">
            <Shield size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {admins.length === 0 ? "No admins found" : "No admins match your search"}
            </h3>
            <p className="text-gray-500 mb-4">
              {admins.length === 0 
                ? "Get started by adding your first admin user" 
                : "Try adjusting your search or filter criteria"}
            </p>
            {admins.length === 0 && (
              <button
                onClick={() => setOpenAdd(true)}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Add Your First Admin
              </button>
            )}
          </div>
        ) : filteredAdmins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
            {filteredAdmins.map((admin, index) => (
              <AdminCard
                key={admin._id}
                admin={admin}
                index={index}
                onChangeRole={changeRole}
                onToggleStatus={toggleStatus}
                onResetPassword={resetPassword}
                onAssignRestaurant={openAssignModal}
                onManagePermissions={openPermissionsModal}
                onRemoveRestaurant={removeRestaurant}
              />
            ))}
          </div>
        ) : null}
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
                  Password *
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
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

      {/* Assign Restaurant Modal */}
      {openAssign && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Building2 size={24} />
                  Assign Restaurant
                </h2>
                <button
                  onClick={() => {
                    setOpenAssign(false);
                    setSelectedAdmin(null);
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Assigning restaurant to: <span className="font-semibold">{selectedAdmin.name}</span>
                </p>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Restaurant *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
                  value={assignForm.restaurantId}
                  onChange={(e) => setAssignForm({ restaurantId: e.target.value })}
                >
                  <option value="">-- Select Restaurant --</option>
                  {restaurants
                    .filter(r => !selectedAdmin.assignedRestaurants?.some(ar => ar._id === r._id))
                    .map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50 rounded-b-2xl border-t">
              <button
                onClick={() => {
                  setOpenAssign(false);
                  setSelectedAdmin(null);
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={assignRestaurant}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {openPermissions && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Settings size={24} />
                  Manage Permissions
                </h2>
                <button
                  onClick={() => {
                    setOpenPermissions(false);
                    setSelectedAdmin(null);
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Managing permissions for: <span className="font-semibold">{selectedAdmin.name}</span>
              </p>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissionsForm.canAccessDashboard}
                    onChange={(e) => setPermissionsForm({ ...permissionsForm, canAccessDashboard: e.target.checked })}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Access Dashboard</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissionsForm.canManageMenus}
                    onChange={(e) => setPermissionsForm({ ...permissionsForm, canManageMenus: e.target.checked })}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Manage Menus</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissionsForm.canManageOrders}
                    onChange={(e) => setPermissionsForm({ ...permissionsForm, canManageOrders: e.target.checked })}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Manage Orders</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissionsForm.canManageTables}
                    onChange={(e) => setPermissionsForm({ ...permissionsForm, canManageTables: e.target.checked })}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Manage Tables</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50 rounded-b-2xl border-t">
              <button
                onClick={() => {
                  setOpenPermissions(false);
                  setSelectedAdmin(null);
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={updatePermissions}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Save Permissions
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
function AdminCard({ admin, index, onChangeRole, onToggleStatus, onResetPassword, onAssignRestaurant, onManagePermissions, onRemoveRestaurant }) {
  const assignedRestaurants = admin.assignedRestaurants || [];

  return (
    <div
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-blue-400 to-indigo-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Shield size={24} className="text-blue-500" />
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
        {/* Role Display */}
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Role:</span>
          <span className="text-sm text-gray-600 capitalize">{admin.role || "admin"}</span>
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

        {/* Assigned Restaurants */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">Restaurants:</span>
            <span className="text-xs text-gray-600">({assignedRestaurants.length})</span>
          </div>
          {assignedRestaurants.length > 0 ? (
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {assignedRestaurants.map((restaurant) => (
                <div key={restaurant._id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg text-xs">
                  <span className="text-gray-700 truncate flex-1">{restaurant.name}</span>
                  <button
                    onClick={() => onRemoveRestaurant(admin._id, restaurant._id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    title="Remove assignment"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No restaurants assigned</p>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onToggleStatus(admin._id, admin.status)}
              className={`p-2 rounded-lg font-medium text-xs transition-all duration-300 flex items-center justify-center gap-1 ${
                admin.status === "Blocked"
                  ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                  : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
              }`}
              title={admin.status === "Blocked" ? "Unblock Admin" : "Block Admin"}
            >
              {admin.status === "Blocked" ? <Unlock size={14} /> : <Lock size={14} />}
              {admin.status === "Blocked" ? "Unblock" : "Block"}
            </button>

            <button
              onClick={() => onResetPassword(admin._id)}
              className="p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all duration-300 font-medium text-xs flex items-center justify-center gap-1 border border-blue-200"
              title="Reset Password"
            >
              <RefreshCcw size={14} />
              Reset
            </button>
          </div>

          <button
            onClick={() => onAssignRestaurant(admin)}
            className="w-full p-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-all duration-300 font-medium text-xs flex items-center justify-center gap-1 border border-purple-200"
            title="Assign Restaurant"
          >
            <Building2 size={14} />
            Assign Restaurant
          </button>

          <button
            onClick={() => onManagePermissions(admin)}
            className="w-full p-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-all duration-300 font-medium text-xs flex items-center justify-center gap-1 border border-amber-200"
            title="Manage Permissions"
          >
            <Settings size={14} />
            Permissions
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