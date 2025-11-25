import axios from "axios";

// 🟢 Get Base API URL from Vite environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

console.log("🟢 Axios Base URL:", API_BASE_URL);

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
