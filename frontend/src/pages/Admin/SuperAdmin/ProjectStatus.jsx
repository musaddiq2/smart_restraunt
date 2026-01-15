import React, { useState } from "react";
import { 
  CheckCircle, PauseCircle, Clock, XCircle, Search 
} from "lucide-react";

// Sample restaurant data
const restaurantsData = [
  {
    _id: "691c0f476b947201e4e90afb",
    name: "The Great Sagar Restaurant",
    status: "Active",
    createdAt: "2025-11-18T06:16:39.513+00:00",
  },
  {
    _id: "691d57e48103f6fc610ff5b7",
    name: "Crunchy Bites Restaurant",
    status: "Disabled",
    createdAt: "2025-11-19T05:38:44.848+00:00",
  },
  {
    _id: "6925345df80f5287931b068c",
    name: "Jabbar Paya House",
    status: "Trial",
    createdAt: "2025-11-25T04:45:17.474+00:00",
  },
  {
    _id: "693101a15f0ca78a81d999fb",
    name: "Red Chilli",
    status: "Expired",
    createdAt: "2025-12-04T03:36:01.693+00:00",
  },
];

const ProjectStatusDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name"); 

  // Stats computation
  const stats = [
    { title: "Active Restaurants", value: restaurantsData.filter(r => r.status.toLowerCase() === "active").length, icon: <CheckCircle size={24} className="text-green-600"/>, bg: "bg-green-100" },
    { title: "Disabled Restaurants", value: restaurantsData.filter(r => r.status.toLowerCase() === "disabled").length, icon: <PauseCircle size={24} className="text-slate-600"/>, bg: "bg-slate-200" },
    { title: "Trial Restaurants", value: restaurantsData.filter(r => r.status.toLowerCase() === "trial").length, icon: <Clock size={24} className="text-amber-600"/>, bg: "bg-amber-100" },
    { title: "Expired Restaurants", value: restaurantsData.filter(r => r.status.toLowerCase() === "expired").length, icon: <XCircle size={24} className="text-red-600"/>, bg: "bg-red-100" },
  ];

  // Filter and sort restaurants
  const filteredRestaurants = [...restaurantsData]
    .filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if(sortBy === "name") return a.name.localeCompare(b.name);
      if(sortBy === "status") return a.status.localeCompare(b.status);
      if(sortBy === "date") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-48px)]">

        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 flex-shrink-0">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2 flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                🚦
              </div>
              Project Status
            </h1>
            <p className="text-slate-600 text-lg">Monitor all restaurants and their states</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 flex-shrink-0">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${stat.bg} p-3 rounded-xl flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
              </div>
              <p className="text-slate-600">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4 flex-shrink-0">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search restaurants..."
              className="pl-10 pr-4 py-3 border border-slate-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
              <option value="date">Sort by Date Added</option>
            </select>
          </div>
        </div>

        {/* Restaurant Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex-1 flex flex-col">
          <div className="overflow-x-auto flex-1 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Restaurant Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Date Added</th>
                </tr>
              </thead>
              <tbody>
                {filteredRestaurants.map(r => (
                  <tr key={r._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-800">{r.name}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        r.status.toLowerCase() === "active" ? "bg-green-100 text-green-700" :
                        r.status.toLowerCase() === "disabled" ? "bg-slate-200 text-slate-700" :
                        r.status.toLowerCase() === "trial" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{new Date(r.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectStatusDashboard;
