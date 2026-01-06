import { useEffect, useState } from "react";
import useTasks from "../../hooks/useTasks";
import { getAllUsers } from "../../services/auth.service";

const TaskForm = ({ task, onClose }) => {
  const { editTask } = useTasks();
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate.split("T")[0],
    priority: task.priority,
    assignedTo: task.assignedTo?._id || "",
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(task.assignedTo || null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data.data);
      } catch (err) {
        console.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setFormData((prev) => ({
      ...prev,
      assignedTo: user._id,
    }));
    setShowUserDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editTask(task._id, formData);
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          Edit Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Assign To */}
          <div className="relative">
            <div
              onClick={() => setShowUserDropdown((prev) => !prev)}
              className="w-full px-4 py-2 border rounded-lg cursor-pointer flex items-center justify-between"
            >
              {selectedUser ? (
                <div className="flex items-center gap-2">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.username}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm">{selectedUser.username}</span>
                </div>
              ) : (
                <span className="text-gray-400 text-sm">
                  Assign to user
                </span>
              )}
            </div>

            {showUserDropdown && (
              <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow max-h-60 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleUserSelect(user)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-sm">
                      {user.username}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
