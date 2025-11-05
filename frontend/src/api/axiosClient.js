import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // 🔗 connect to backend later
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosClient;
