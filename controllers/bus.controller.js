// controllers/bus.controller.js
const Bus = require('../models/bus'); // Bus schema

// Add a new bus (Admin only)
exports.addBus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can add a bus.' });
    }

    const {
      busNumber,
      busName,
      source,
      destination,
      departureTime,
      arrivalTime,
      totalSeats,
      fare
    } = req.body;

    const existingBus = await Bus.findOne({ busNumber });
    if (existingBus) {
      return res.status(400).json({ message: 'Bus number already exists.' });
    }

    const newBus = new Bus({
      busNumber,
      busName,
      source,
      destination,
      departureTime,
      arrivalTime,
      totalSeats,
      fare,
      createdBy: req.user._id
    });

    await newBus.save();
    res.status(201).json({ message: 'Bus added successfully!', bus: newBus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding bus.', error: err.message });
  }
};

// Update an existing bus (Admin only)
exports.updateBus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update a bus.' });
    }

    const bus = await Bus.findById(req.params.busId);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found.' });
    }

    Object.assign(bus, req.body);
    await bus.save();

    res.status(200).json({ message: 'Bus updated successfully!', bus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating bus.', error: err.message });
  }
};

// Delete a bus (Admin only)
exports.deleteBus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete a bus.' });
    }

    const deletedBus = await Bus.findByIdAndDelete(req.params.busId);
    if (!deletedBus) {
      return res.status(404).json({ message: 'Bus not found or already deleted.' });
    }

    res.status(200).json({ message: 'Bus deleted successfully!', bus: deletedBus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting bus.', error: err.message });
  }
};
