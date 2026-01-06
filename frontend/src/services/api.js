import axios from "axios";

const api = axios.create({
  baseURL: "https://task-management-b-81d8.onrender.com",
  withCredentials: true,
});

export default api;

