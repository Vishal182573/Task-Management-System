import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
// import Institute from "../models/instituteModel";
// import Task from "../models/taskModel";

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

const getUserByInstituteNameAndRole = asyncHandler(async (req, res) => {
  const { instituteName, role } = req.query;

  if (!instituteName) {
    return res.status(400).json({ message: "Institute Name is required" });
  }

  try {
    // Constructing the query object dynamically
    const query = { address: instituteName };
    if (role) {
      query.role = role; // Add role condition if provided
    }

    const user = await User.findOne(query);

    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: `User with institute name '${instituteName}' and role '${role || "any"}' not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
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
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, contact, workingAddress, photograph } =
    req.body;

  if (!name || !email || !password || !role) {
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
  });
  const createdUser = await user.save();
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
    user.photographUri = photograph;

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

const updateEmail = asyncHandler(async (req, res) => {
  const { userId, email } = req.body;
  if (!userId || !email) {
    return res.status(400).json({ message: "User ID and Email are required" });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    user.email = email;
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const { userId, contact } = req.body;
  if (!userId || !contact) {
    return res
      .status(400)
      .json({ message: "User ID and Contact are required" });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    user.contact = contact;
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const updatePhotograph = asyncHandler(async (req, res) => {
  const { userId, photograph } = req.body;
  if (!userId || !photograph) {
    return res
      .status(400)
      .json({ message: "User ID and Photograph are required" });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    user.photographUri = photograph;
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const updateRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  if (!userId || !role) {
    return res.status(400).json({ message: "User ID and Role are required" });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    if (
      role !== "admin" ||
      role !== "lg" ||
      role !== "nodal" ||
      role !== "reporting"
    ) {
      return res.status(400).json({ message: "Invalid Role" });
    }
    user.role = role;
    const updatedUser = await user.save();
    return res.json(updatedUser);
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
  updateEmail,
  updateContact,
  updatePhotograph,
  updateRole,
  loginUser,
  getCurrentUser,
  updateUser,
  getUserByInstituteNameAndRole
};
