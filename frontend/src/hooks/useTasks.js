import { useEffect, useState } from "react";
import {
  getTasks,
  deleteTask,
  updateTask,
  getYouTasks,
  updateTaskStatus,
} from "../services/task.service";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [youTasks, setYouTasks] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async (pageNumber = page) => {
    setLoading(true);
    setError("");

    try {
      const res = await getTasks({ page: pageNumber });
      
      setTasks(res.data.data.tasks);
      setPage(res.data.data.currentPage);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };
  const fetchYouTasks = async (pageNumber = page) => {
    setLoading(true);
    setError("");

    try {
      const res = await getYouTasks({ page: pageNumber });
      console.log(res.data);

      setYouTasks(res.data.data.tasks);
      setPage(res.data.data.currentPage);
    } catch (err) {
        console.log(err);
        
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };


  const removeTask = async (taskId) => {
    await deleteTask(taskId);
    fetchTasks();
    fetchYouTasks();
  };

  const editTask = async (taskId, data) => {
    await updateTask(taskId, data);
    fetchTasks();
    fetchYouTasks();
  };

  const completeTask = async (taskId, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    await updateTaskStatus(taskId, newStatus);
    fetchTasks();
    fetchYouTasks();
  };

  useEffect(() => {
    fetchTasks()
    fetchYouTasks()
  }, []);

  return {
    tasks,
    loading,
    error,
    page,
    setPage,
    fetchTasks,
    removeTask,
    editTask,
    completeTask,
    youTasks,
    fetchYouTasks
  };
};

export default useTasks;
