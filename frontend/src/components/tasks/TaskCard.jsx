import { useState } from "react";
import useTasks from "../../hooks/useTasks";
import useAuth from "../../hooks/useAuth";

const TaskCard = ({ task, onEdit }) => {
  const { removeTask, completeTask } = useTasks();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { user } = useAuth();

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    await removeTask(task._id);
    setShowDeleteConfirm(false);
  };

  const handleCompleteTask = async () => {
    await completeTask(task._id, task.status);
    window.location.reload();
  };

  return (
    <div className={`p-3 border rounded-lg ${task.status === "completed" ? "bg-green-50 border-green-300" : "bg-gray-50"}`}>
      <h3 className={`font-medium ${task.status === "completed" ? "line-through text-gray-500" : "text-gray-800"}`}>
        {task.title}
      </h3>
      <p className={`text-sm mt-1 ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-600"}`}>
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>

      {/* Assigned To */}
      {task.assignedTo && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-gray-500">Assigned to:</span>
          <img
            src={task.assignedTo.avatar}
            alt={task.assignedTo.username}
            className="w-5 h-5 rounded-full"
          />
          <span className="text-xs text-gray-700">{task.assignedTo.username}</span>
        </div>
      )}

      {/* Assigned By */}
      {task.createdBy && (
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-gray-500">Created by:</span>
          <img
            src={task.createdBy.avatar}
            alt={task.createdBy.username}
            className="w-5 h-5 rounded-full"
          />
          <span className="text-xs text-gray-700">{task.createdBy.username}</span>
        </div>
      )}

      <div className="flex justify-between items-center mt-3">
        {task.assignedTo.username ===user.username && <button
          onClick={handleCompleteTask}
          className={`text-xs px-3 py-1 rounded font-medium ${
            task.status === "completed"
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {task.status === "completed" ? "Mark Incomplete" : "Mark Complete"}
        </button>}

        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="text-xs text-blue-600 cursor-pointer hover:underline"
            >
              Edit
            </button>
          )}
          {task.createdBy.username === user.username && (
            <button
              onClick={handleDeleteClick}
              className="text-xs text-red-600 cursor-pointer hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className=" inset-0 relative mt-4 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Delete Task
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded font-medium hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
