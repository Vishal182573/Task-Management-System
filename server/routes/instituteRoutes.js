import { Router } from "express";
import {
  getInstitutes,
  getInstituteById,
  createInstitute,
  assignReportingOfficer,
  assignNodalOfficer,
  addTaskToInstitute,
  updateLogo,
  deleteInstitute,
  updateInstitute,
} from "../controllers/instituteController.js";
const router = Router();

router.get("/", getInstitutes);
router.get("/getInstituteById", getInstituteById);

router.post("/", createInstitute);
router.post("/addTask", addTaskToInstitute);

router.put("/", updateInstitute);
router.put("/assignReportingOfficer", assignReportingOfficer);
router.put("/assignNodalOfficer", assignNodalOfficer);
router.put("/updateLogo", updateLogo);

router.delete("/", deleteInstitute);

export default router;
