import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://insightful-comfort-production-036c.up.railway.app/api/v1",
  withCredentials: true,
});

export default api;

