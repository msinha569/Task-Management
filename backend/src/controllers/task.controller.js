import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, assignedTo } = req.body;

  // Validate required fields (string-safe)
  if (!title || !description || !dueDate || !priority || !assignedTo) {
    throw new ApiError(400, "All fields are required");
  }

  const task = await Task.create({
    title: title.trim(),
    description: description.trim(),
    dueDate,
    priority,
    assignedTo,
    createdBy: req.user._id,
  });

  if (!task) {
    throw new ApiError(500, "Something went wrong with task creation");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

const getTasks = asyncHandler(async (req, res) => {
    const { page = 1, limit = 5} = req.query;


    const tasks = await Task.find({ assignedTo: req.user._id })
    .populate("createdBy", "username avatar")
    .populate("assignedTo", "username avatar")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

    return res.status(200).json(
        new ApiResponse(200, {
        tasks,
        currentPage: Number(page),
        })
    );
})
const getYouTasks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5} = req.query;


  const tasks = await Task.find({createdBy: req.user._id})
    .populate("createdBy", "username avatar")
    .populate("assignedTo", "username avatar")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
//   const totalTasks = await Task.countDocuments({assignedTo: req.user._id});


  return res.status(200).json(
    new ApiResponse(200, {
      tasks,
      currentPage: Number(page),
    })
  );
})
const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id)
    .populate("createdBy", "username avatar")
    .populate("assignedTo", "username avatar");

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const isCreator =
    task.createdBy._id.toString() === req.user._id.toString();

  const isAssigned =
    task.assignedTo._id.toString() === req.user._id.toString();

  if (!isCreator && !isAssigned) {
    throw new ApiError(403, "You are not authorized to view this task");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task));
});


const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, assignedTo } = req.body;

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this task");
  }

  if (title) task.title = title.trim();
  if (description) task.description = description.trim();
  if (dueDate) task.dueDate = dueDate;
  if (priority) task.priority = priority;
  if (assignedTo) task.assignedTo = assignedTo

  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

const taskStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
    const {status} = req.body
  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.assignedTo.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this task");
  }

  task.status = status

  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});



const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this task");
  }

  await task.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Task deleted successfully"));
});


export { 
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getYouTasks,
    taskStatus
};
