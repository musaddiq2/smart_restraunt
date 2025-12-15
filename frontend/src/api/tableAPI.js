import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/tables";

// Get all tables
export const fetchTables = async () => {
  const res = await axios.get(API_URL);
  return res.data.tables; // FIXED
};

// Add table
export const createTable = async (tableData) => {
  const res = await axios.post(API_URL, tableData);
  return res.data.table; // FIXED
};
