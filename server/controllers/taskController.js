import asyncHandler from "express-async-handler";
import Institute from "../models/instituteModel.js";
import Task from "../models/taskModel.js";

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  return res.json(tasks);
});

const getTaskById = asyncHandler(async (req, res) => {
  // const { taskId } = req.body;
  const taskId = req.query.id;

  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }
  const task = await Task.findOne({
    taskId,
  });
  if (task) {
    return res.json(task);
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, status, startingDate, endingDate } =
    req.body;

  if (
    !title ||
    !description ||
    !assignedTo ||
    !status ||
    !startingDate ||
    !endingDate
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const taskId = `T-${Math.floor(1000 + Math.random() * 9000)}`;

  const assignedInstitute = await Institute.findOne({
    name: assignedTo,
  });

  if (!assignedInstitute) {
    return res.status(400).json({ message: "Institute not found" });
  }

  const task = new Task({
    taskId,
    title,
    description,
    assignedTo,
    status,
    startingDate,
    endingDate,
  });

  const createdTask = await task.save();
  return res.status(201).json(createdTask);
});

const updateTaskStatus = asyncHandler(async (req, res) => {
  const { taskId, status } = req.body;
  if (!taskId || !status) {
    return res.status(400).json({ message: "Task ID and Status are required" });
  }
  const task = await Task.findOne({
    taskId,
  });
  if (task) {
    task.status = status;
    const updatedTask = await task.save();
    return res.json(updatedTask);
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

const updateTaskAssignedTo = asyncHandler(async (req, res) => {
  const { taskId, assignedTo } = req.body;
  if (!taskId || !assignedTo) {
    return res
      .status(400)
      .json({ message: "Task ID and Assigned To are required" });
  }
  const task = await Task.findOne({
    taskId,
  });
  if (task) {
    const instituteExists = await Institute.findOne({
      name: assignedTo,
    });
    if (!instituteExists) {
      return res.status(400).json({ message: "Institute not found" });
    }
    task.assignedTo = assignedTo;
    const updatedTask = await task.save();
    return res.json(updatedTask);
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

const updateTaskEndingDate = asyncHandler(async (req, res) => {
  const { taskId, endingDate } = req.body;
  if (!taskId || !endingDate) {
    return res
      .status(400)
      .json({ message: "Task ID and Ending Date are required" });
  }
  const task = await Task.findOne({
    taskId,
  });
  if (task) {
    task.endingDate = endingDate;
    const updatedTask = await task.save();
    return res.json(updatedTask);
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.body;
  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }
  const task = await Task.findOne({
    taskId,
  });
  if (task) {
    await task.remove();
    return res.json({ message: "Task removed" });
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

const updateTaskTitle = asyncHandler(async (req, res) => {
  const { taskId, title } = req.body;
  if (!taskId || !title) {
    return res.status(400).json({ message: "Task ID and Title are required" });
  }
  const task = await Task.findOne({
    taskId,
  });
  if (task) {
    task.title = title;
    const updatedTask = await task.save();
    return res.json(updatedTask);
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

const updateTaskDescription = asyncHandler(async (req, res) => {
  const { taskId, description } = req.body;
  if (!taskId || !description) {
    return res
      .status(400)
      .json({ message: "Task ID and Description are required" });
  }
  const task = await Task.findOne({
    taskId,
  });
  if (task) {
    task.description = description;
    const updatedTask = await task.save();
    return res.json(updatedTask);
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

export {
  getTasks,
  getTaskById,
  createTask,
  updateTaskStatus,
  updateTaskAssignedTo,
  updateTaskEndingDate,
  deleteTask,
  updateTaskTitle,
  updateTaskDescription,
};
