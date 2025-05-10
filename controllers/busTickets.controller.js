// controllers/busTicket.controller.js
const BusTicket = require('../models/busTicket');
const Bus = require('../models/bus');

// Create a new bus ticket (booking)
exports.bookBusTicket = async (req, res) => {
  try {
    const { bus, seatNumber } = req.body;
    const user = req.user._id;

    // Check if seat is already booked
    const existingTicket = await BusTicket.findOne({ bus, seatNumber, status: 'booked' });
    if (existingTicket) {
      return res.status(400).json({ message: 'Seat already booked.' });
    }

    const ticket = new BusTicket({ user, bus, seatNumber });
    await ticket.save();

    res.status(201).json({ message: 'Ticket booked successfully!', ticket });
  } catch (err) {
    res.status(500).json({ message: 'Error booking ticket.', error: err.message });
  }
};

// Get all tickets for a user
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await BusTicket.find({ user: req.user._id })
      .populate('bus', 'busNumber busName source destination');

    res.status(200).json({ tickets });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tickets.', error: err.message });
  }
};

// Cancel a ticket
exports.cancelBusTicket = async (req, res) => {
  try {
    const ticket = await BusTicket.findById(req.params.ticketId);

    if (!ticket || ticket.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this ticket.' });
    }

    ticket.status = 'cancelled';
    await ticket.save();

    res.status(200).json({ message: 'Ticket cancelled successfully.', ticket });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling ticket.', error: err.message });
  }
}


