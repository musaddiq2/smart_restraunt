// central axios instance used by slices
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE,
  timeout: 15000,
});

// Optional: interceptors for logging / auth
axiosInstance.interceptors.request.use((cfg) => {
  // console.log("API request:", cfg.method, cfg.url);
  return cfg;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    // normalize error shape
    return Promise.reject(err);
  }
);

export default axiosInstance;
