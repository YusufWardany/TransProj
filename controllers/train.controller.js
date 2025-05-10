// controllers/train.controller.js
const Train = require('../models/train');

// Add a new train (Admin only)
exports.addTrain = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can add a train.' });
    }

    const {
      trainNumber,
      trainName,
      source,
      destination,
      departureTime,
      arrivalTime,
      totalSeats,
      fare
    } = req.body;

    const existingTrain = await Train.findOne({ trainNumber });
    if (existingTrain) {
      return res.status(400).json({ message: 'Train number already exists.' });
    }

    const newTrain = new Train({
      trainNumber,
      trainName,
      source,
      destination,
      departureTime,
      arrivalTime,
      totalSeats,
      fare,
      createdBy: req.user._id
    });

    await newTrain.save();
    res.status(201).json({ message: 'Train added successfully!', train: newTrain });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding train.', error: err.message });
  }
};

// Update an existing train (Admin only)
exports.updateTrain = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update a train.' });
    }

    const train = await Train.findById(req.params.trainId);
    if (!train) {
      return res.status(404).json({ message: 'Train not found.' });
    }

    Object.assign(train, req.body);
    await train.save();

    res.status(200).json({ message: 'Train updated successfully!', train });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating train.', error: err.message });
  }
};

// Delete a train (Admin only)
exports.deleteTrain = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete a train.' });
    }

    const deletedTrain = await Train.findByIdAndDelete(req.params.trainId);
    if (!deletedTrain) {
      return res.status(404).json({ message: 'Train not found or already deleted.' });
    }

    res.status(200).json({ message: 'Train deleted successfully!', train: deletedTrain });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting train.', error: err.message });
  }
};
