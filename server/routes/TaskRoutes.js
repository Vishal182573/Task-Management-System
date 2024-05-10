const express = require('express');
const {
    getTasks,
    getTaskById,
    createTask,
    updateTaskStatus,
    updateTaskAssignedTo,
    updateTaskEndingDate,
    deleteTask,
    updateTaskTitle,
    updateTaskDescription,
} = require('../controllers/taskController');
const router = express.Router();

router.get('/', getTasks);
router.get('/getTaskById', getTaskById);

router.post('/', createTask);

router.put('/updateStatus', updateTaskStatus);
router.put('/updateAssignedTo', updateTaskAssignedTo);
router.put('/updateEndingDate', updateTaskEndingDate);
router.put('/updateTitle', updateTaskTitle);
router.put('/updateDescription', updateTaskDescription);

router.delete('/', deleteTask);

module.exports = router;
