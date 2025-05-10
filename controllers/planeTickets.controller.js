// controllers/planeTicket.controller.js
const PlaneTicket = require('../models/planeTicket');

// Book a new plane ticket
exports.bookTicket = async (req, res) => {
  try {
    const newTicket = new PlaneTicket({
      ...req.body,
      user: req.user._id,
      referenceNumber: `PLN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
    });
    await newTicket.save();
    res.status(201).json({ message: 'Plane ticket booked successfully.', ticket: newTicket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error booking ticket.', error: err.message });
  }
};

// Get all plane tickets for the logged-in user
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await PlaneTicket.find({ user: req.user._id }).populate('plane');
    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tickets.', error: err.message });
  }
};

// Cancel a plane ticket
exports.cancelTicket = async (req, res) => {
  try {
    const ticket = await PlaneTicket.findOne({ _id: req.params.id, user: req.user._id });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found.' });

    ticket.status = 'cancelled';
    await ticket.save();
    res.status(200).json({ message: 'Ticket cancelled successfully.', ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error cancelling ticket.', error: err.message });
  }
};