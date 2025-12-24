import axios from "axios";


const API_BASE = import.meta.env.VITE_API_URL;



export const registerUser = async (data) => {
  return await axios.post(`${API_URL}/auth/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${API_URL}/auth/login`, data);
};


