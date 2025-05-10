// routes/train.routes.js
const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const {
  addTrain,
  updateTrain,
  deleteTrain
} = require('../controllers/train.controller');

const router = express.Router();

router.post('/add-train', protect, addTrain);
router.put('/update-train/:trainId', protect, updateTrain);
router.delete('/delete-train/:trainId', protect, deleteTrain);

module.exports = router;
