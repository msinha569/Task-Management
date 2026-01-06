import useTasks from "../hooks/useTasks";
import PriorityColumn from "../components/tasks/PriorityColumn";

const TaskList = () => {
  const { tasks, loading, error } = useTasks();

  const high = tasks.filter(t => t.priority === "high");
  const medium = tasks.filter(t => t.priority === "medium");
  const low = tasks.filter(t => t.priority === "low");

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-3 gap-6">
      <PriorityColumn title="High" color="red" tasks={high} />
      <PriorityColumn title="Medium" color="yellow" tasks={medium} />
      <PriorityColumn title="Low" color="green" tasks={low} />
    </div>
  );
};

export default TaskList;
