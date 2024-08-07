import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Institute from "../models/instituteModel.js";
import Task from "../models/taskModel.js";
import { NODAL_OFFICER, REPORTING_OFFICER } from "../constant.js";

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

// TODO: secure it
const getCurrentUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "User ID is required" });
  }
  const user = await User.findOne({
    email,
  });

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const getUserByTask = asyncHandler(async (req, res) => {
  const { taskId, role } = req.query;

  if (!taskId) {
    return res.status(400).json({ message: "taskId Name is required" });
  }

  try {
    const task = await Task.findOne({ taskId });
    if (task) {
      const institute = await Institute.findOne({ name: task.assignedTo });
      const userId = "";
      if (institute && role === NODAL_OFFICER) {
        userId = institute.nodalOfficer;
      } else if (institute && role === REPORTING_OFFICER) {
        userId = institute.reportingOfficer;
      }

      const user = await User.findOne({ userId: institute.nodalOfficer });

      return res.status(200).json(user);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  // const { userId } = req.body;
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  const user = await User.findOne({
    userId,
  });

  console.log(user)
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const createUser = asyncHandler(async (req, res) => {
  const {name, photograph, contact, email, password, workingAddress, role, institute} =
    req.body;
    
  if (!name || !email || !password || !role || !workingAddress || !institute || !contact) {
    return res
      .status(400)
      .json({ message: "Atleast Name, Email, Password and Role are required" });
  }

  const userExists = await User.findOne({
    email,
  });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const userId = `U-${Math.floor(1000 + Math.random() * 9000)}`;

  const user = new User({
    userId,
    name,
    email,
    password,
    role,
    contact: contact.toString() || null,
    institute,
    // photograph: photograph.toString(),
    workingAddress: workingAddress.toString()
  });

  const createdUser = await user.save();

  console.log(createUser)
  return res.status(201).json(createdUser.userId);
});

const updateUser = asyncHandler(async (req, res) => {
  const {
    userId,
    name,
    email,
    role,
    contact,
    workingAddress,
    password,
    photograph,
  } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Atleast Name, Email, Password and Role are required" });
  }
  const user = await User.findOne({
    userId,
  });

  if (user) {
    user.name = name;
    user.email = email;
    user.contact = contact;
    user.photograph = photograph;

    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const updateAddress = asyncHandler(async (req, res) => {
  const { userId, address } = req.body;
  if (!userId || !address) {
    return res
      .status(400)
      .json({ message: "User ID and Address are required" });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    user.address = address;
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    await user.remove();
    return res.json({ message: "User removed" });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }
  const user = await User.findOne({
    email,
    password,
  });
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: "Invalid username or password" });
  }
});

export {
  getUsers,
  getUserById,
  createUser,
  updateAddress,
  deleteUser,
  loginUser,
  getCurrentUser,
  updateUser,
  getUserByTask,
};
