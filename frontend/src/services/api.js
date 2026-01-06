import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://task-management-b-81d8.onrender.com",
  withCredentials: true,
});

export default api;

