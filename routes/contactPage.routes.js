const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const contactController = require('../controllers/contactController');

// Public submission endpoint
router.post('/submit', contactController.submitContactForm);

// Admin-only routes
router.get('/submissions', authMiddleware, contactController.getSubmissions);
router.put('/update-submission', authMiddleware, contactController.updateSubmissionStatus);
router.put('/update-contact-info', authMiddleware, contactController.updateContactInfo);

module.exports = router;
