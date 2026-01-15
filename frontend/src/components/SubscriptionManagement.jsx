import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "../styles/theme.css";

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    planName: "",
    billingCycle: "MONTHLY",
    price: "",
    maxTables: "",
    maxOrdersPerDay: "",
    analyticsAccess: false,
    gracePeriodDays: 3,
  });

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/subscriptions");
      setSubscriptions(res.data);
    } catch (err) {
      console.error("Failed to fetch subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/subscriptions/create", {
        planName: form.planName,
        billingCycle: form.billingCycle,
        price: Number(form.price),
        gracePeriodDays: Number(form.gracePeriodDays),
        features: {
          maxTables: Number(form.maxTables),
          maxOrdersPerDay: Number(form.maxOrdersPerDay),
          analyticsAccess: form.analyticsAccess,
        },
        expiryDate:
          form.billingCycle === "MONTHLY"
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      });

      fetchSubscriptions();
    } catch (err) {
      console.error("Error creating plan", err);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">Subscription Management</h2>

      {/* CREATE PLAN */}
      <form onSubmit={handleSubmit} className="grid mt-4">
        <input name="planName" placeholder="Plan Name" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />

        <select name="billingCycle" onChange={handleChange}>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>

        <input name="maxTables" type="number" placeholder="Max Tables" onChange={handleChange} />
        <input name="maxOrdersPerDay" type="number" placeholder="Max Orders / Day" onChange={handleChange} />

        <input
          name="gracePeriodDays"
          type="number"
          min="2"
          max="7"
          placeholder="Grace Period (2–7 days)"
          onChange={handleChange}
        />

        <label className="flex gap-2">
          <input type="checkbox" name="analyticsAccess" onChange={handleChange} />
          Analytics Access
        </label>

        <button className="btn-primary">Create Plan</button>
      </form>

      {/* LIST */}
      <div className="mt-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Cycle</th>
                <th>Price</th>
                <th>Tables</th>
                <th>Orders</th>
                <th>Analytics</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr key={s._id}>
                  <td>{s.planName}</td>
                  <td>{s.billingCycle}</td>
                  <td>₹{s.price}</td>
                  <td>{s.features?.maxTables}</td>
                  <td>{s.features?.maxOrdersPerDay}</td>
                  <td>{s.features?.analyticsAccess ? "Yes" : "No"}</td>
                  <td>{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManagement;
