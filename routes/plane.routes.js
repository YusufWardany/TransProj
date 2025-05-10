// routes/plane.routes.js
const express = require('express');
const { bookFlight } = require('../controllers/plane.controller');
const authMiddleware = require('../middleware/auth.middleware');
const {
  addPlane,
  updatePlane,
  deletePlane
} = require('../controllers/plane.controller');

const router = express.Router();

router.post('/book', authMiddleware, bookFlight);
router.put('/update-plane/:planeId', authMiddleware, updatePlane);
router.delete('/delete-plane/:planeId', authMiddleware, deletePlane);

module.exports = router;
