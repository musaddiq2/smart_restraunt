// central axios instance used by slices
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE, // ✅ FIX HERE
  timeout: 15000,
});

// Optional: interceptors for logging / auth
axiosInstance.interceptors.request.use((config) => {
  // Example: attach token
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
