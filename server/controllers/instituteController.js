import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Institute from "../models/instituteModel.js";
import Task from "../models/taskModel.js";

const getInstitutes = asyncHandler(async (req, res) => {
  const institutes = await Institute.find({});
  return res.json(institutes);
});

const getInstituteById = asyncHandler(async (req, res) => {
  // const { name } = req.body;
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Institute name is required" });
  }
  const institute = await Institute.findOne({
    name,
  });
  if (institute) {
    res.json(institute);
  } else {
    return res.status(404).json({ message: "Institute not found" });
  }
});

const createInstitute = asyncHandler(async (req, res) => {
  const { name, nodalOfficerId, logo, reportingOfficerId } = req.body;

  if (!name || !nodalOfficerId || !reportingOfficerId) {
    return res.status(400).json({
      message:
        "Name of Institute, Nodal officer ID, Reporting officer ID are required",
    });
  }
  const instituteExists = await Institute.findOne({
    name,
  });

  if (instituteExists) {
    return res.status(400).json({ message: "Institute already exists" });
  }

  const nodalOfficer = await User.findOne({
    userId: nodalOfficerId,
  });

  if (!nodalOfficer) {
    return res.status(400).json({ message: "Nodal officer not found" });
  }

  const reportingOfficer = await User.findOne({
    userId: reportingOfficerId,
  });

  if (!reportingOfficer) {
    return res.status(400).json({ message: "Reporting officer not found" });
  }

  const institute = new Institute({
    name,
    nodalOfficer: nodalOfficerId,
    reportingOfficer: reportingOfficerId,
    tasks: [],
    // logo: logo || null,
  });

  const createdInstitute = await institute.save();
  return res.status(201).json(createdInstitute);
});

const assignReportingOfficer = asyncHandler(async (req, res) => {
  const { reportingOfficerId, instituteName } = req.body;
  if (!reportingOfficerId || !instituteName) {
    return res.status(400).json({
      message: "Institute name and Reporting officer ID are required",
    });
  }

  const institute = await Institute.findOne({
    name: instituteName,
  });
  if (institute) {
    const reportingOfficer = await User.findOne({
      userId: reportingOfficerId,
      role: "reporting",
    });

    if (!reportingOfficer) {
      return res.status(400).json({ message: "Reporting officer not found" });
    }

    institute.reportingOfficer = reportingOfficerId;
    const updatedInstitute = await institute.save();
    return res.json(updatedInstitute);
  } else {
    return res.status(404).json({ message: "Institute not found" });
  }
});

const assignNodalOfficer = asyncHandler(async (req, res) => {
  const { nodalOfficerId, instituteName } = req.body;
  if (!nodalOfficerId || !instituteName) {
    return res
      .status(400)
      .json({ message: "Institute name and Nodal officer ID are required" });
  }

  const institute = await Institute.findOne({
    name: instituteName,
  });
  if (institute) {
    const nodalOfficer = await User.findOne({
      userId: nodalOfficerId,
      role: "nodal",
    });

    if (!nodalOfficer) {
      return res.status(400).json({ message: "Nodal officer not found" });
    }

    institute.nodalOfficer = nodalOfficerId;
    const updatedInstitute = await institute.save();
    return res.json(updatedInstitute);
  } else {
    return res.status(404).json({ message: "Institute not found" });
  }
});

const addTaskToInstitute = asyncHandler(async (req, res) => {
  const { taskId, instituteName } = req.body;
  if (!taskId || !instituteName) {
    return res.status(400).json({
      message: "Institute name and Task ID are required",
    });
  }

  const institute = await Institute.findOne({
    name: instituteName,
  });

  if (institute) {
    const task = await Task.findOne({
      taskId,
    });
    if (!task) {
      return res.status(400).json({ message: "Task not found" });
    }
    institute.tasks.push(taskId);
    const updatedInstitute = await institute.save();
    return res.json(updatedInstitute);
  } else {
    return res.status(404).json({ message: "Institute not found" });
  }
});

const updateLogo = asyncHandler(async (req, res) => {
  const { logo, instituteName } = req.body;
  if (!logo || !instituteName) {
    return res.status(400).json({
      message: "Institute name and Logo are required",
    });
  }
  const institute = await Institute.findOne({
    name: instituteName,
  });
  if (institute) {
    institute.logo = logo;
    const updatedInstitute = await institute.save();
    return res.json(updatedInstitute);
  } else {
    return res.status(404).json({ message: "Institute not found" });
  }
});

const updateInstitute = asyncHandler(async (req, res) => {
  const { logo, name, instituteId: _id } = req.body;

  // if (!logo || !name) {
  if (!name) {
    return res.status(400).json({
      message: "Institute name and Logo are required",
    });
  }
  const institute = await Institute.findOne({
    _id,
  });

  if (institute) {
    institute.logo = logo;
    institute.name = name;
    const updatedInstitute = await institute.save();
    return res.json(updatedInstitute);
  } else {
    return res.status(404).json({ message: "Institute not found" });
  }
});

const deleteInstitute = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Institute name is required" });
  }
  const institute = await Institute.findOne({
    name,
  });

  if (!institute) {
    return res.status(404).json({ message: "Institute not found" });
  }

  const nodalOfficer = institute.nodalOfficer;
  const reportingOfficer = institute.reportingOfficer;

  if (nodalOfficer) {
    await User.findOneAndDelete({
      userId: nodalOfficer,
    });
  }

  if (reportingOfficer) {
    await User.findOneAndDelete({
      userId: reportingOfficer,
    });
  }

  await Institute.deleteOne({ _id: institute._id });
  return res.json({ message: "Institute removed" });
});

export {
  getInstitutes,
  getInstituteById,
  createInstitute,
  assignReportingOfficer,
  assignNodalOfficer,
  addTaskToInstitute,
  updateLogo,
  deleteInstitute,
  updateInstitute,
};
