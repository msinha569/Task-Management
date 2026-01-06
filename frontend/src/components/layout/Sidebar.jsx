import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center px-6 text-xl font-bold">
        Simple
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }>
          Tasks Assigned To You
        </NavLink>
        <NavLink
          to="/you"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }>
          Tasks Assigned By You
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}>
          Create Task
        </NavLink>
      </nav>

      <div className="p-4 border-t text-sm text-gray-500">
        © Task Manager - msinha569
      </div>
    </div>
  );
};

export default Sidebar;
