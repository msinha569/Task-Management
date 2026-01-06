import { useState } from "react";
import useTasks from "../hooks/useTasks";
import PriorityColumn from "../components/tasks/PriorityColumn";
import TaskForm from "../components/tasks/TaskForm";

const TasksCreatedByYou = () => {
  const { youTasks, loading, error } = useTasks();
  const [editingTask, setEditingTask] = useState(null);

  const high = youTasks.filter(t => t.priority === "high");
  const medium = youTasks.filter(t => t.priority === "medium");
  const low = youTasks.filter(t => t.priority === "low");

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <PriorityColumn 
          title="High" 
          color="red" 
          tasks={high}
          onEdit={setEditingTask}
        />
        <PriorityColumn 
          title="Medium" 
          color="yellow" 
          tasks={medium}
          onEdit={setEditingTask}
        />
        <PriorityColumn 
          title="Low" 
          color="green" 
          tasks={low}
          onEdit={setEditingTask}
        />
      </div>

      {editingTask && (
        <TaskForm task={editingTask} onClose={() => setEditingTask(null)} />
      )}
    </>
  );
};

export default TasksCreatedByYou;
