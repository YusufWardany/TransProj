// controllers/plane.controller.js
const Plane = require('../models/plane');
const FlightTicket = require('../models/planeTickets');
const Flight = require('../models/flight'); // Add this line to import the Flight model


exports.bookFlight = async (req, res) => {
  try {
    const { flightId, passengerDetails, seats } = req.body;
    const userId = req.user.id; // From auth middleware
    
    // Create booking
    const booking = new FlightTicket({
      flight: flightId,
      user: userId,
      passengers: passengerDetails,
      seats,
      bookingDate: new Date()
    });
    
    await booking.save();
    
    // Update flight availability
    await Flight.findByIdAndUpdate(flightId, {
      $inc: { availableSeats: -seats.length }
    });
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new plane (Admin only)
exports.addPlane = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can add a plane.' });
    }

    const {
      flightNumber,
      airline,
      departureCity,
      arrivalCity,
      departureDateTime,
      arrivalDateTime,
      duration,
      stops,
      price,
      availableSeats,
      aircraftType,
      baggageAllowance
    } = req.body;

    const newPlane = new Plane({
      flightNumber,
      airline,
      departureCity,
      arrivalCity,
      departureDateTime,
      arrivalDateTime,
      duration,
      stops,
      price,
      availableSeats,
      aircraftType,
      baggageAllowance
    });

    await newPlane.save();
    res.status(201).json({ message: 'Plane added successfully!', plane: newPlane });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding plane.', error: err.message });
  }
};

// Update an existing plane (Admin only)
exports.updatePlane = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update a plane.' });
    }

    const plane = await Plane.findById(req.params.planeId);
    if (!plane) {
      return res.status(404).json({ message: 'Plane not found.' });
    }

    Object.assign(plane, req.body);
    await plane.save();

    res.status(200).json({ message: 'Plane updated successfully!', plane });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating plane.', error: err.message });
  }
};

// Delete a plane (Admin only)
exports.deletePlane = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete a plane.' });
    }

    const plane = await Plane.findByIdAndDelete(req.params.planeId);
    if (!plane) {
      return res.status(404).json({ message: 'Plane not found.' });
    }

    res.status(200).json({ message: 'Plane deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting plane.', error: err.message });
  }
};
