const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const AdminController = require('../controllers/admin.controller'); // تأكد من صحة المسار
// routes/admin.routes.js
const { addTrip, getTrips, updateTrip, deleteTrip } = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');



router.post('/trips', authMiddleware, adminMiddleware, addTrip);
router.get('/trips', authMiddleware, adminMiddleware, getTrips);
router.put('/trips/:id', authMiddleware, adminMiddleware, updateTrip);
router.delete('/trips/:id', authMiddleware, adminMiddleware, deleteTrip);


// Route to register a new admin
router.post('/register', AdminController.registerAdmin);

// Route to login an admin
router.post('/login', AdminController.loginAdmin);

// Route to get admin profile (protected route)
router.get('/profile', protect, AdminController.getAdminProfile);
router.put('/profile', protect, AdminController.updateAdminProfile);


// Route to reset admin password
router.post('/reset-password', AdminController.requestPasswordReset);
router.put('/reset-password/:token', AdminController.resetPassword);

// Route to generate new password reset token
router.post('/generate-password-reset-token', AdminController.generatePasswordResetToken);

module.exports = router;

