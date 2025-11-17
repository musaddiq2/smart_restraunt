import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  UserPlus, 
  Store, 
  UtensilsCrossed, 
  ChefHat, 
  DollarSign, 
  Edit, 
  Trash2, 
  Phone, 
  Utensils 
} from "lucide-react";

// --- MOCK COMPONENTS (FOR SINGLE-FILE RUNNABILITY) ---

// Mock data for the Restaurant List
const MOCK_RESTAURANTS = [
    { id: 'RS1001', name: 'The Golden Spoon', contact: '+91 9876543210', type: 'Veg & Non-Veg', status: 'Active' },
    { id: 'RS1002', name: 'Veggie Delight', contact: '+91 9123456789', type: 'Veg', status: 'Active' },
    { id: 'RS1003', name: 'Spicy Wok', contact: '+91 8000000000', type: 'Non-Veg', status: 'Inactive' },
    { id: 'RS1004', name: 'The Burger Joint', contact: '+91 7555511111', type: 'Non-Veg', status: 'Active' },
];

const AnalyticsCard = ({ title, value, growth, icon, bgColor, shadow }) => (
    <div className={`p-5 rounded-xl flex items-center justify-between ${bgColor} ${shadow} transition hover:shadow-xl border border-slate-100`}>
        <div className="flex flex-col text-left">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-extrabold text-slate-800 my-1">{value}</p>
            <p className={`text-xs font-semibold ${growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{growth}</p>
        </div>
        <div className="p-3 bg-orange-100 rounded-full">
            {icon}
        </div>
    </div>
);

const ChartCard = ({ title, description, bgColor, shadow, rounded }) => (
    <div className={`${bgColor} ${shadow} ${rounded} p-6 h-96 border border-slate-100`}>
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mb-4">{description}</p>
        <div className="flex items-center justify-center h-5/6 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-gray-400">
            [Chart Visualization Placeholder: Sales Data]
        </div>
    </div>
);


// --- NEW RESTAURANT LIST COMPONENT ---

const RestaurantList = () => {
    const handleAction = (action, restaurant) => {
        // NOTE: Using a custom modal is recommended over alert() in production.
        console.log(`${action} requested for: ${restaurant.name}`);
        alert(`${action} action requested for ${restaurant.name} (ID: ${restaurant.id})`);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mt-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Store size={24} className="text-orange-600" />
                Restaurant Partner List
            </h2>
            <p className="text-slate-500 mb-6 text-sm">Manage all registered restaurant partners, including status and actions.</p>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_RESTAURANTS.map((restaurant) => (
                            <tr key={restaurant.id} className="hover:bg-orange-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">{restaurant.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">{restaurant.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{restaurant.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        restaurant.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {restaurant.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <div className="flex justify-center gap-3">
                                        <button 
                                            onClick={() => handleAction('Edit', restaurant)}
                                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition"
                                            title="Edit Restaurant"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleAction('Contact', restaurant)}
                                            className="text-orange-600 hover:text-orange-900 p-1 rounded-full hover:bg-orange-50 transition"
                                            title="Contact Restaurant"
                                        >
                                            <Phone size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleAction('Delete', restaurant)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition"
                                            title="Delete Restaurant"
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
            {/* Pagination Placeholder */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <span className="font-medium">Showing 1 to 4 of {MOCK_RESTAURANTS.length} Restaurants</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 border rounded-lg bg-orange-500 text-white shadow-md">1</button>
                    <button className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50" disabled>Next</button>
                </div>
            </div>
        </div>
    );
};


// --- MAIN DASHBOARD COMPONENT ---

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-orange-50/50 p-4 sm:p-6 lg:p-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
          Restaurant Overview
        </h1>
        
        {/* 🔘 Action Buttons (Redesigned) */}
        <div className="flex flex-wrap justify-end gap-3 sm:gap-4">
          {/* ➕ Add Admin Button */}
          <button
            onClick={() => navigate("/admin/add-admin")}
            className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 
                        text-white font-medium sm:font-semibold text-sm sm:text-base
                        bg-gradient-to-br from-indigo-500 to-indigo-600 
                        rounded-full shadow-lg hover:shadow-xl hover:scale-105 
                        transition-all duration-300 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            <UserPlus size={18} className="group-hover:rotate-6 transition-transform duration-300" />
            Add Admin
          </button>

          {/* 🍽 Add Restaurant Button */}
          <button
            onClick={() => navigate("/admin/add-restaurant")}
            className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 
                        text-white font-medium sm:font-semibold text-sm sm:text-base
                        bg-gradient-to-br from-rose-500 to-rose-600 
                        rounded-full shadow-lg hover:shadow-xl hover:scale-105 
                        transition-all duration-300 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
          >
            <Store size={18} className="group-hover:rotate-6 transition-transform duration-300" />
            Add Restaurant
          </button>
        </div>
      </div>

      {/* 📊 Enhanced Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard 
          title="Total Orders" 
          value="1,245" 
          growth="+12%" 
          icon={<UtensilsCrossed size={24} className="text-orange-500" />} // New icon
          bgColor="bg-white" // Standard card background
          shadow="shadow-lg"
        />
        <AnalyticsCard 
          title="Revenue" 
          value="₹54,890" 
          growth="+8%" 
          icon={<DollarSign size={24} className="text-green-500" />} // New icon
          bgColor="bg-white"
          shadow="shadow-lg"
        />
        <AnalyticsCard 
          title="Active Customers" 
          value="987" 
          growth="+6%" 
          icon={<UserPlus size={24} className="text-blue-500" />} // New icon
          bgColor="bg-white"
          shadow="shadow-lg"
        />
        <AnalyticsCard 
          title="Top Dishes" 
          value="Butter Chicken" 
          growth="250 units" 
          icon={<ChefHat size={24} className="text-purple-500" />} // New custom card for restaurant-specific metric
          bgColor="bg-white"
          shadow="shadow-lg"
        />
      </div>

      {/* 📈 Main Content Area: Sales Chart and other modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2">
          <ChartCard 
            title="Weekly Sales Performance" // Added title to ChartCard
            description="Overview of order and revenue trends." // Added description
            bgColor="bg-white"
            shadow="shadow-lg"
            rounded="rounded-2xl"
          />
        </div>

        {/* Placeholder for other restaurant-specific cards (e.g., Recent Orders, Table Status) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Insights</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                <span>Pending Orders:</span>
                <span className="font-semibold text-orange-600">14</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                <span>Available Tables:</span>
                <span className="font-semibold text-green-600">8</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                <span>New Reviews:</span>
                <span className="font-semibold text-blue-600">5</span>
              </li>
            </ul>
          </div>
          <button className="mt-6 w-full py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors">
            View All Reports
          </button>
        </div>
      </div>
      
      {/* 🍽 RESTAURANT LIST - NEW SECTION */}
      <RestaurantList />
      
    </div>
  );
}