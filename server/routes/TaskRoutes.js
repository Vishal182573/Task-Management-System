import { Router } from 'express';
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
  requestExtension,
  rejectRequestExtension,
  approveRequestExtension,
  updateTask,
} from '../controllers/taskController.js';
const router = Router();

router.get('/', getTasks);
router.get('/getTaskById', getTaskById);

router.post('/', createTask);
router.post('/approveRequestExtension', approveRequestExtension);
router.post('/rejectRequestExtension', rejectRequestExtension);
router.post('/requestExtension', requestExtension);

router.put('/update', updateTask);
router.put('/updateStatus', updateTaskStatus);
router.put('/updateAssignedTo', updateTaskAssignedTo);
router.put('/updateEndingDate', updateTaskEndingDate);
router.put('/updateTitle', updateTaskTitle);
router.put('/updateDescription', updateTaskDescription);

router.delete('/', deleteTask);

export default router;
