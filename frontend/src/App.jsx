import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTask from "./pages/CreateTask";
import TaskList from "./pages/TaskList";
import TasksCreatedByYou from "./pages/TasksCreatedByYou";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
        <Route element={<PageLayout />}>
            <Route path="/" element={<TaskList/>} />
            <Route path="/you" element={<TasksCreatedByYou/>} />
            <Route path="/create" element={<CreateTask/>} />
        </Route>
        </Route>


      </Routes>
    </BrowserRouter>
  );
};

export default App;
