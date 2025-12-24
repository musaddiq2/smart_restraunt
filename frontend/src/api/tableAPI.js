import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

// Get all tables
export const fetchTables = async () => {
  const res = await axios.get(`${API_BASE}/tables`);
  return res.data.tables;
};

// Add table
export const createTable = async (tableData) => {
  const res = await axios.post(`${API_BASE}/tables`, tableData);
  return res.data.table;
};
