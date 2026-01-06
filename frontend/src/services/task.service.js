import api from "./api";

export const createTask = (data) => {
  return api.post("/tasks", data);
};

export const getTasks = (params) => {
  return api.get("/tasks", { params });
};
export const getYouTasks = (params) => {
  return api.get("/tasks/you", { params });
};

export const getTaskById = (id) => {
  return api.get(`/tasks/${id}`);
};

export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

export const updateTaskStatus = (id, status) => {
  return api.put(`/tasks/status/${id}`, { status });
};
