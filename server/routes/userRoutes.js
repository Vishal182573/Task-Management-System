const express = require('express');
const {
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
} = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.get('/getUserById', getUserById);

router.post('/', createUser);
router.post('/login', loginUser);

router.put('/updateAddress', updateAddress);
router.put('/updateEmail', updateEmail);
router.put('/updateContact', updateContact);
router.put('/updatePhotograph', updatePhotograph);
router.put('/updateRole', updateRole);

router.delete('/', deleteUser);

module.exports = router;
