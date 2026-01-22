import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CreditCard,
  TrendingUp,
  Users,
  AlertCircle,
  Check,
  X,
  Edit2,
  UserPlus,
  Download,
  Search,
} from "lucide-react";

const SubscriptionManagement = () => {
  const [selectedTab, setSelectedTab] = useState("plans");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const [payments, setPayments] = useState([]);
  const [newPlan, setNewPlan] = useState({
    name: "",
    type: "Monthly",
    price: 0,
    maxTables: 0,
    maxOrders: 0,
    analytics: false,
  });

  const token = localStorage.getItem("token"); // Replace with your auth token

  // Fetch subscription plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
     const res = await axios.get("/api/subscriptions/plans", {
  headers: { Authorization: `Bearer ${token}` },
});

// 🔥 Handle all backend response shapes safely
const plansData = Array.isArray(res.data)
  ? res.data
  : res.data.plans || res.data.data || [];

setPlans(plansData);

      } catch (err) {
        console.error(err);
      }
    };
    fetchPlans();
  }, [token]);

  // Fetch payment history
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("/api/subscriptions/payments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPayments();
  }, [token]);

  // Create a new subscription plan
  const handleCreatePlan = async () => {
    try {
      const res = await axios.post(
        "/api/subscriptions/plans",
        newPlan,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlans([...plans, res.data]);
      setShowCreateModal(false);
      setNewPlan({ name: "", type: "Monthly", price: 0, maxTables: 0, maxOrders: 0, analytics: false });
    } catch (err) {
      console.error(err);
      alert("Failed to create plan.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2 flex items-center gap-3">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <CreditCard className="text-white" size={32} />
              </div>
              Subscription Management
            </h1>
            <p className="text-slate-600 text-lg">Manage plans, assignments, payments & invoices</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Create Plan
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-8 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab("plans")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                selectedTab === "plans"
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Subscription Plans
            </button>
            <button
              onClick={() => setSelectedTab("payments")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                selectedTab === "payments"
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Payment History
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        {selectedTab === "plans" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-r ${plan.color || "from-violet-500 to-purple-600"} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                      {plan.status || "Active"}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">₹{plan.price.toLocaleString()}</span>
                    <span className="text-white/80 text-lg">/ {plan.type}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
                    <Users size={16} />
                    <span>{plan.subscribers || 0} active subscribers</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-slate-700">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span>{plan.maxTables === -1 ? "Unlimited" : plan.maxTables} Tables</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span>{plan.maxOrders === -1 ? "Unlimited" : plan.maxOrders} Orders/Day</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      {plan.analytics ? (
                        <Check className="text-green-500 flex-shrink-0" size={20} />
                      ) : (
                        <X className="text-slate-400 flex-shrink-0" size={20} />
                      )}
                      <span>Analytics Access</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                      <UserPlus size={18} />
                      Assign
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <Edit2 size={18} />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment History */}
        {selectedTab === "payments" && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                💰 Payment History
              </h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search payments..."
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2">
                  <Download size={18} />
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Restaurant</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Plan</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Amount</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-800">{payment.restaurant}</td>
                      <td className="py-4 px-6 text-slate-600">{payment.plan}</td>
                      <td className="py-4 px-6 font-semibold text-slate-800">₹{payment.amount.toLocaleString()}</td>
                      <td className="py-4 px-6 text-slate-600">{new Date(payment.date).toLocaleDateString()}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            payment.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : payment.status === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {payment.status === "paid" ? (
                          <button className="text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-1">
                            <Download size={16} />
                            Download
                          </button>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Plan Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white">
                <h3 className="text-2xl font-bold">Create Subscription Plan</h3>
                <p className="text-white/80 mt-1">Define a new subscription plan for restaurants</p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Plan Name</label>
                  <input
                    type="text"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    placeholder="e.g. Premium"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Billing Type</label>
                    <select
                      value={newPlan.type}
                      onChange={(e) => setNewPlan({ ...newPlan, type: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({ ...newPlan, price: parseInt(e.target.value) })}
                      placeholder="999"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Max Tables</label>
                    <input
                      type="number"
                      value={newPlan.maxTables}
                      onChange={(e) => setNewPlan({ ...newPlan, maxTables: parseInt(e.target.value) })}
                      placeholder="10"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Max Orders/Day</label>
                    <input
                      type="number"
                      value={newPlan.maxOrders}
                      onChange={(e) => setNewPlan({ ...newPlan, maxOrders: parseInt(e.target.value) })}
                      placeholder="100"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPlan.analytics}
                      onChange={(e) => setNewPlan({ ...newPlan, analytics: e.target.checked })}
                      className="w-5 h-5 text-violet-600 rounded focus:ring-2 focus:ring-violet-500"
                    />
                    <div>
                      <span className="font-semibold text-slate-700">Analytics Access</span>
                      <p className="text-sm text-slate-600">Enable advanced analytics and reporting features</p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePlan}
                    className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Create Plan
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

export default SubscriptionManagement;
