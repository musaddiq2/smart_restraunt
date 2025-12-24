import axios from "axios";


const API_BASE = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
  },
});

export default axiosClient;
