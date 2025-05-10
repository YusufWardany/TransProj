// routes/busTicket.routes.js
const express = require('express');
const router = express.Router();
const { bookBusTicket, getUserTickets, cancelBusTicket } = require('../controllers/busTicket.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/book', authMiddleware, bookBusTicket);
router.get('/my-tickets', authMiddleware, getUserTickets);
router.delete('/cancel/:ticketId', authMiddleware, cancelBusTicket);

module.exports = router;