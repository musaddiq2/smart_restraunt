import React, { useState } from "react";
import { User, Phone, Mail, CheckCircle, AlertCircle, Search, Filter, MoreVertical, Eye, MessageSquare, UserCheck, Clock, TrendingUp, Download, Plus } from "lucide-react";

// Sample restaurant owner data
const ownersData = [
  {
    id: "1",
    name: "The Great Sagar Restaurant",
    contact: "07947111504",
    email: "sagar@example.com",
    verified: true,
    supportTickets: 2,
    createdAt: "2025-11-18T06:16:39.513+00:00",
    status: "active",
    plan: "Pro",
    revenue: 9999,
    avatar: "https://ui-avatars.com/api/?name=Sagar+Restaurant&background=6366f1&color=fff"
  },
  {
    id: "2",
    name: "Crunchy Bites Restaurant",
    contact: "7788778877",
    email: "crunchy@example.com",
    verified: false,
    supportTickets: 1,
    createdAt: "2025-11-19T05:38:44.848+00:00",
    status: "active",
    plan: "Basic",
    revenue: 999,
    avatar: "https://ui-avatars.com/api/?name=Crunchy+Bites&background=3b82f6&color=fff"
  },
  {
    id: "3",
    name: "Jabbar Paya House",
    contact: "0240-2293344",
    email: "jabbar@gmail.com",
    verified: true,
    supportTickets: 0,
    createdAt: "2025-11-25T04:45:17.474+00:00",
    status: "active",
    plan: "Enterprise",
    revenue: 24999,
    avatar: "https://ui-avatars.com/api/?name=Jabbar+Paya&background=f59e0b&color=fff"
  },
  {
    id: "4",
    name: "Red Chilli",
    contact: "0240-2789123",
    email: "redinfo@gmail.com",
    verified: false,
    supportTickets: 3,
    createdAt: "2025-12-04T03:36:01.693+00:00",
    status: "inactive",
    plan: "Basic",
    revenue: 0,
    avatar: "https://ui-avatars.com/api/?name=Red+Chilli&background=ef4444&color=fff"
  },
  {
    id: "5",
    name: "Spice Paradise",
    contact: "9876543210",
    email: "spice@paradise.com",
    verified: true,
    supportTickets: 0,
    createdAt: "2025-11-10T08:20:15.123+00:00",
    status: "active",
    plan: "Pro",
    revenue: 9999,
    avatar: "https://ui-avatars.com/api/?name=Spice+Paradise&background=8b5cf6&color=fff"
  },
  {
    id: "6",
    name: "Ocean Breeze Cafe",
    contact: "9988776655",
    email: "ocean@breeze.com",
    verified: true,
    supportTickets: 1,
    createdAt: "2025-10-22T11:45:30.456+00:00",
    status: "active",
    plan: "Enterprise",
    revenue: 24999,
    avatar: "https://ui-avatars.com/api/?name=Ocean+Breeze&background=06b6d4&color=fff"
  },
];

const ClientManagementDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or table
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Stats computation
  const totalRevenue = ownersData.reduce((acc, o) => acc + o.revenue, 0);
  const activeClients = ownersData.filter(o => o.status === "active").length;
  
  const stats = [
    { 
      title: "Total Clients", 
      value: ownersData.length, 
      icon: <User size={24} className="text-blue-600"/>, 
      bg: "bg-blue-100",
      change: "+12%",
      changePositive: true
    },
    { 
      title: "Active Clients", 
      value: activeClients, 
      icon: <UserCheck size={24} className="text-green-600"/>, 
      bg: "bg-green-100",
      change: "+8%",
      changePositive: true
    },
    { 
      title: "Total Revenue", 
      value: `₹${(totalRevenue / 1000).toFixed(1)}K`, 
      icon: <TrendingUp size={24} className="text-purple-600"/>, 
      bg: "bg-purple-100",
      change: "+23%",
      changePositive: true
    },
    { 
      title: "Support Tickets", 
      value: ownersData.reduce((acc, o) => acc + o.supportTickets, 0), 
      icon: <AlertCircle size={24} className="text-amber-600"/>, 
      bg: "bg-amber-100",
      change: "-5%",
      changePositive: false
    },
  ];

  // Filter & sort
  const filteredOwners = [...ownersData]
    .filter(o => {
      const matchesSearch = o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           o.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "all" || o.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "verified") return (b.verified === a.verified) ? 0 : b.verified ? 1 : -1;
      if (sortBy === "tickets") return b.supportTickets - a.supportTickets;
      if (sortBy === "revenue") return b.revenue - a.revenue;
      return 0;
    });

  const handleViewDetails = (owner) => {
    setSelectedOwner(owner);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2 flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                <User className="text-white" size={32} />
              </div>
              Client Management
            </h1>
            <p className="text-slate-600 text-lg">Manage restaurant owners, contacts, and support</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-slate-700 px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all border border-slate-200 flex items-center gap-2">
              <Download size={20} />
              Export
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Plus size={20} />
              Add Client
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} p-3 rounded-xl flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  stat.changePositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
              <p className="text-slate-600">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="pl-10 pr-4 py-3 border border-slate-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 flex-wrap w-full md:w-auto">
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="verified">Sort by Verification</option>
                <option value="tickets">Sort by Tickets</option>
                <option value="revenue">Sort by Revenue</option>
              </select>

              <div className="flex gap-2 bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    viewMode === "grid" ? "bg-white shadow-md text-blue-600" : "text-slate-600"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    viewMode === "table" ? "bg-white shadow-md text-blue-600" : "text-slate-600"
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOwners.map(owner => (
              <div key={owner.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <img src={owner.avatar} alt={owner.name} className="w-16 h-16 rounded-full border-4 border-white/30" />
                    <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{owner.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      owner.status === "active" ? "bg-green-500/20 text-white border border-white/30" : "bg-red-500/20 text-white border border-white/30"
                    }`}>
                      {owner.status === "active" ? "Active" : "Inactive"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30">
                      {owner.plan}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-slate-700">
                      <Phone size={16} className="text-slate-400" />
                      <span className="text-sm">{owner.contact}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <Mail size={16} className="text-slate-400" />
                      <span className="text-sm truncate">{owner.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <Clock size={16} className="text-slate-400" />
                      <span className="text-sm">{new Date(owner.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-200">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 mb-1">Revenue</p>
                      <p className="text-sm font-bold text-slate-800">₹{owner.revenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 mb-1">Tickets</p>
                      <p className="text-sm font-bold text-slate-800">{owner.supportTickets}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-600">Verification</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      owner.verified ? "bg-green-100 text-green-700 flex items-center gap-1" : "bg-red-100 text-red-700"
                    }`}>
                      {owner.verified && <CheckCircle size={14} />}
                      {owner.verified ? "Verified" : "Unverified"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewDetails(owner)}
                      className="flex-1 bg-blue-50 text-blue-700 py-2.5 rounded-xl font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <MessageSquare size={16} />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Client</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Contact</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Plan</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Revenue</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Tickets</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOwners.map(owner => (
                    <tr key={owner.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={owner.avatar} alt={owner.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-semibold text-slate-800">{owner.name}</p>
                            <p className="text-sm text-slate-500">{owner.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Phone size={16} className="text-slate-400" />
                          {owner.contact}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700">
                          {owner.plan}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 w-fit ${
                            owner.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}>
                            {owner.status === "active" ? "Active" : "Inactive"}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 w-fit ${
                            owner.verified ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {owner.verified ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                            {owner.verified ? "Verified" : "Unverified"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-800">₹{owner.revenue.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          owner.supportTickets > 0 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                        }`}>
                          {owner.supportTickets}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleViewDetails(owner)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                          >
                            <Eye size={18} />
                          </button>
                          <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-600">
                            <MessageSquare size={18} />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedOwner && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img src={selectedOwner.avatar} alt={selectedOwner.name} className="w-20 h-20 rounded-full border-4 border-white/30" />
                    <div>
                      <h3 className="text-2xl font-bold">{selectedOwner.name}</h3>
                      <p className="text-white/80">{selectedOwner.plan} Plan</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-slate-600 mb-2">
                        <Phone size={16} />
                        <span className="text-sm font-semibold">Phone</span>
                      </div>
                      <p className="text-slate-800 font-medium">{selectedOwner.contact}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-slate-600 mb-2">
                        <Mail size={16} />
                        <span className="text-sm font-semibold">Email</span>
                      </div>
                      <p className="text-slate-800 font-medium">{selectedOwner.email}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">Account Details</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-slate-600 mb-1">Status</p>
                      <p className={`text-lg font-bold ${selectedOwner.status === "active" ? "text-green-700" : "text-red-700"}`}>
                        {selectedOwner.status === "active" ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-slate-600 mb-1">Revenue</p>
                      <p className="text-lg font-bold text-purple-700">₹{selectedOwner.revenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-slate-600 mb-1">Tickets</p>
                      <p className="text-lg font-bold text-amber-700">{selectedOwner.supportTickets}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">Verification Status</h4>
                  <div className={`rounded-xl p-4 flex items-center gap-3 ${
                    selectedOwner.verified ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"
                  }`}>
                    {selectedOwner.verified ? (
                      <CheckCircle size={24} className="text-green-600" />
                    ) : (
                      <AlertCircle size={24} className="text-amber-600" />
                    )}
                    <div>
                      <p className={`font-semibold ${selectedOwner.verified ? "text-green-700" : "text-amber-700"}`}>
                        {selectedOwner.verified ? "Account Verified" : "Verification Pending"}
                      </p>
                      <p className="text-sm text-slate-600">
                        {selectedOwner.verified 
                          ? "This account has been verified and is in good standing."
                          : "This account requires verification. Please review submitted documents."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Close
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientManagementDashboard;