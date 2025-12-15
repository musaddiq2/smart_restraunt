import axios from "axios";

// 🟢 Get Base API URL from Vite environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

console.log("🟢 Axios Base URL:", API_BASE_URL);

// ✅ Create Axios instance
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional: 10s timeout
});

// ✅ Request interceptor (optional, for auth token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // adjust if using redux or context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor for errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("⚠ Axios error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
