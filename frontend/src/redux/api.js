// src/redux/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // or "http://localhost:5000/api/v1"
});


// Automatically add token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // <-- your JWT token from login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
