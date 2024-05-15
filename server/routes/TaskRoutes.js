import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTaskStatus,
  updateTaskAssignedTo,
  updateTaskEndingDate,
  deleteTask,
  updateTaskTitle,
  updateTaskDescription,
} from "../controllers/taskController.js";
const router = Router();

router.get("/", getTasks);
router.get("/getTaskById", getTaskById);

router.post("/", createTask);

router.put("/updateStatus", updateTaskStatus);
router.put("/updateAssignedTo", updateTaskAssignedTo);
router.put("/updateEndingDate", updateTaskEndingDate);
router.put("/updateTitle", updateTaskTitle);
router.put("/updateDescription", updateTaskDescription);

router.delete("/", deleteTask);

export default router;
