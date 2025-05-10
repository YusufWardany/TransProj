// controllers/admin.controller.js
const Admin = require('../models/adminSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Trip = require('../models/trip.model');


exports.addTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Register new admin
const registerAdmin = async (req, res) => {
  const { firstName, lastName, email, phone, password, role } = req.body;
  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      phone,
      password,
      role
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering admin', error: err.message });
  }
};

// Login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const correctPassword = await admin.correctPassword(password, admin.password);
    if (!correctPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = admin.generateAuthToken();
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// Get admin profile
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching admin profile', error: err.message });
  }
};

// Update admin profile
const updateAdminProfile = async (req, res) => {
  const { firstName, lastName, phone } = req.body;
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(req.user.id, { firstName, lastName, phone }, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ message: 'Error updating admin profile', error: err.message });
  }
};

// Request password reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const resetToken = admin.createPasswordResetToken();
    await admin.save();

    // Send the reset token to the admin via email (email functionality needs to be implemented)
    res.status(200).json({ message: 'Password reset token sent to email', resetToken });
  } catch (err) {
    res.status(500).json({ message: 'Error processing password reset', error: err.message });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const admin = await Admin.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
    
    if (!admin) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    admin.password = newPassword;
    admin.passwordResetToken = undefined;
    admin.passwordResetExpires = undefined;
    
    await admin.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};

// Generate password reset token
const generatePasswordResetToken = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const resetToken = admin.createPasswordResetToken();
    await admin.save();

    // Send reset token to the admin email (email service needed)
    res.status(200).json({ message: 'Password reset token generated', resetToken });
  } catch (err) {
    res.status(500).json({ message: 'Error generating reset token', error: err.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  requestPasswordReset,
  resetPassword,
  generatePasswordResetToken
};
