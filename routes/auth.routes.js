const express = require('express');
const router = express.Router();
const User = require('../models/user');

// @route POST /api/register
router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
      licenseNumber,
      vehicleType
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
      ...(role === 'driver' && { licenseNumber, vehicleType })
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
