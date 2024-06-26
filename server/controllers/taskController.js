import asyncHandler from "express-async-handler";
import Institute from "../models/instituteModel.js";
import Task from "../models/taskModel.js";
import Notification from "../models/notificationModel.js";
import { INPROGRESS } from "../constant.js";

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.aggregate([
    {
      $lookup: {
        from: "users", // Collection name for users
        localField: "assignedTo",
        foreignField: "name", // Adjust if you are looking up by name
        as: "nodalOfficer",
      },
    },
    {
      $unwind: {
        path: "$nodalOfficer",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        taskId: 1,
        title: 1,
        description: 1,
        assignedTo: 1,
        status: 1,
        startingDate: 1,
        endingDate: 1,
        created: 1,
        nodalOfficerName: "$nodalOfficer.name",
      },
    },
  ]);

  // console.log(tasks);
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

  if (!title || !description || !assignedTo || !startingDate || !endingDate) {
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
    status: INPROGRESS,
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

  const deletedTask = await Task.findOneAndDelete({
    taskId: taskId,
  });

  if (deletedTask) {
    // await task.remove();
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

const approveRequestExtension = asyncHandler(async (req, res) => {
  const { taskId } = req.body;

  const days = 5;
  if (!taskId || !days) {
    return res.status(400).json({ message: "Task ID and Days are required" });
  }
  const task = await Task.findOne({
    taskId,
  });
  if (task) {
    task.endingDate.setDate(task.endingDate.getDate() + days);
    const updatedTask = await task.save();
    const notification = new Notification({
      title: "Task Extension Approved",
      description: `Your request for extension of task ${task.taskId} has been approved`,
      status: "Approved",
      type: "Answer",
      nodalOfficer: task.assignedTo,
      taskId: task.taskId,
      institute: "APJ", // TODO: remove hard coding
    });
    await notification.save();
    return res.json(updatedTask);
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

const rejectRequestExtension = asyncHandler(async (req, res) => {
  const { taskId } = req.body;
  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }
  const task = await Task.findOne({
    taskId,
  });
  if (task) {
    const notification = new Notification({
      title: "Task Extension Rejected",
      description: `Your request for extension of task ${task.taskId} has been rejected`,
      status: "Rejected",
      type: "Answer",
      nodalOfficer: task.assignedTo,
      taskId: task.taskId,
      institute: "APJ",
    });
    await notification.save();
    return res.json(notification);
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

const requestExtension = asyncHandler(async (req, res) => {
  const { taskId, days } = req.body;
  if (!taskId || !days) {
    return res.status(400).json({ message: "Task ID and Days are required" });
  }

  const task = await Task.findOne({
    taskId,
  });

  if (task) {
    // console.log(task);
    const notification = new Notification({
      title: "Task Extension Request",
      description: `Request for extension of task ${task.taskId} by ${days} days`,
      status: "Pending",
      type: "Request",
      institute: task.assignedTo,
      taskId: task.taskId,
    });
    // console.log(notification);
    await notification.save();
    return res.json(notification);
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const { taskId, title, description, startingDate, endingDate } = req.body;

  if (!taskId || !title || !description || !startingDate || !endingDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const task = await Task.findOne({ taskId });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = title;
  task.description = description;
  task.startingDate = new Date(startingDate);
  task.endingDate = new Date(endingDate);

  const updatedTask = await task.save();

  res.status(200).json(updatedTask);
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
  approveRequestExtension,
  rejectRequestExtension,
  requestExtension,
  updateTask,
};
