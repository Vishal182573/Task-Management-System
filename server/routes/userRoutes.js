import { Router } from "express";
import {
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
} from "../controllers/userController.js";
const router = Router();

router.get("/", getUsers);
router.post("/getCurrentUser", getCurrentUser); // TODO: convert into get request
router.get("/getUserById", getUserById);

router.post("/", createUser);
router.post("/login", loginUser);

router.put("/", updateUser);
router.put("/updateAddress", updateAddress);
router.put("/updateEmail", updateEmail);
router.put("/updateContact", updateContact);
router.put("/updatePhotograph", updatePhotograph);
router.put("/updateRole", updateRole);

router.delete("/", deleteUser);

export default router;
