// routes/planeTicket.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
  bookTicket,
  getUserTickets,
  cancelTicket
} = require('../controllers/planeTicket.controller');

router.post('/book', authMiddleware, bookTicket);
router.get('/my-tickets', authMiddleware, getUserTickets);
router.put('/cancel/:id', authMiddleware, cancelTicket);

module.exports = router;
