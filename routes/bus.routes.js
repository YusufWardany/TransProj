// routes/busRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth.middleware'); // Assuming auth middleware is set up
const {
  addBus,
  updateBus,
  deleteBus
} = require('../controllers/bus.controller'); // Import controller methods

const router = express.Router();

// Add a new bus (Admin only)
router.post('/add-bus', protect, addBus);

// Update an existing bus (Admin only)
router.put('/update-bus/:busId', protect, updateBus);

// Delete a bus (Admin only)
router.delete('/delete-bus/:busId', protect, deleteBus);

module.exports = router;
