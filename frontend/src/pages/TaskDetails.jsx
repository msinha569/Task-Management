import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById } from "../services/task.service";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const res = await getTaskById(id);
        setTask(res.data.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">Loading task details...</div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error || "Task not found"}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Go back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
            <div
              className={`px-4 py-2 rounded-lg font-semibold ${
                task.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {task.status === "completed" ? "Completed" : "Pending"}
            </div>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Description
            </h2>
            <p className="text-gray-600 whitespace-pre-wrap">{task.description}</p>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Due Date */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Due Date
            </h3>
            <p className="text-lg text-gray-800 mt-1">
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Priority */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Priority
            </h3>
            <p
              className={`text-lg font-semibold mt-1 ${
                task.priority === "high"
                  ? "text-red-600"
                  : task.priority === "medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </p>
          </div>
        </div>

        {/* Assigned Information */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Assigned To */}
          {task.assignedTo && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Assigned To
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={task.assignedTo.avatar}
                  alt={task.assignedTo.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {task.assignedTo.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    {task.assignedTo.fullname}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Created By */}
          {task.createdBy && (
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Created By
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={task.createdBy.avatar}
                  alt={task.createdBy.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {task.createdBy.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    {task.createdBy.fullname}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Timestamps */}
        <div className="border-t pt-4 text-sm text-gray-500">
          {task.createdAt && (
            <p>
              Created on:{" "}
              {new Date(task.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
          {task.updatedAt && (
            <p>
              Last updated:{" "}
              {new Date(task.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
