import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateAddress,
  deleteUser,
  loginUser,
  getCurrentUser,
  updateUser,
  getUserByTask,
} from "../controllers/userController.js";
const router = Router();

router.get("/", getUsers);
router.post("/getCurrentUser", getCurrentUser); // TODO: convert into get request
router.get("/getUserById", getUserById);
router.get("/getOfficerByTask", getUserByTask);

router.post("/", createUser);
router.post("/login", loginUser);

router.put("/", updateUser);
router.put("/updateAddress", updateAddress);

router.delete("/", deleteUser);

export default router;
