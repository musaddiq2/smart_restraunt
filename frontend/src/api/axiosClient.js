import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
  },
});

export default axiosClient;
