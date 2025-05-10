const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

// Protect all routes
router.use(protect);

// Admin: Get all users
router.get('/', getAllUsers);

// Get user by ID (self or admin)
router.get('/:id', getUserById);

// Update user by ID
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;
