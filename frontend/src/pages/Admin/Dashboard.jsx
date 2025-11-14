// src/pages/Admin/Dashboard.jsx
import React from "react";
import AnalyticsCard from "../../components/AnalyticsCard";
import ChartCard from "../../components/ChartCard";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* ✅ Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalyticsCard title="Total Orders" value="1,245" growth="+12%" />
        <AnalyticsCard title="Revenue" value="₹54,890" growth="+8%" />
        <AnalyticsCard title="Active Customers" value="987" growth="+6%" />
      </div>

      {/* 📈 Sales Chart */}
      <ChartCard />
    </div>
  );
}
