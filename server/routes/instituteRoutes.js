const express = require('express');
const {
  getInstitutes,
  getInstituteById,
  createInstitute,
  assignReportingOfficer,
  assignNodalOfficer,
  addTaskToInstitute,
  updateLogo,
  deleteInstitute,
} = require('../controllers/instituteController');
const router = express.Router();

router.get('/', getInstitutes);
router.get('/getInstituteById', getInstituteById);

router.post('/', createInstitute);
router.post('/addTask', addTaskToInstitute);

router.put('/assignReportingOfficer', assignReportingOfficer);
router.put('/assignNodalOfficer', assignNodalOfficer);
router.put('/updateLogo', updateLogo);

router.delete('/', deleteInstitute);

module.exports = router;
