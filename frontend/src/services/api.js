import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://task-management-bay-nine.vercel.app/",
  withCredentials: true,
});

export default api;

