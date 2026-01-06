import TaskCard from "./TaskCard";

const colors = {
  red: "border-red-400",
  yellow: "border-yellow-400",
  green: "border-green-400",
};

const PriorityColumn = ({ title, color, tasks, onEdit }) => {
  return (
    <div className={`bg-white p-4 rounded-lg border-t-4 ${colors[color]}`}>
      <h2 className="font-semibold mb-3">{title}</h2>

      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default PriorityColumn;
