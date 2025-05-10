// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/book', authMiddleware, ticketController.bookTicket);
router.get('/my-tickets', authMiddleware, ticketController.getUserTickets);
router.put('/cancel/:id', authMiddleware, ticketController.cancelTicket);

module.exports = router;