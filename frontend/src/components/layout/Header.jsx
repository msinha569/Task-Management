import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowLogoutPrompt(false);
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };



  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800">
        Task Management
      </h1>

      <div className="flex items-center gap-4 relative">
        <span className="text-sm text-gray-600">
          Hello, {user?.fullname || "User"}
        </span>

        <button
          onClick={() => setShowLogoutPrompt(!showLogoutPrompt)}
          className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium cursor-pointer hover:bg-gray-400 transition"
        >
          {user ? (
            <img
              src={user?.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-white">{getInitials(user?.fullname)}</span>
          )}
        </button>

        {showLogoutPrompt && (
          <div className="absolute top-14 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-48 z-50">
            <p className="text-sm text-gray-700 mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogoutPrompt(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded text-sm font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
