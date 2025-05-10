// controllers/ticketController.js
const Ticket = require('../models/ticket');

exports.bookTicket = async (req, res) => {
  try {
    const ticketData = req.body;
    ticketData.user = req.user._id; // From auth middleware

    const newTicket = new Ticket(ticketData);
    await newTicket.save();

    res.status(201).json({ message: 'Ticket booked successfully!', ticket: newTicket });
  } catch (error) {
    console.error('Booking ticket error:', error);
    res.status(500).json({ message: 'Failed to book ticket.', error: error.message });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ tickets });
  } catch (error) {
    console.error('Fetching tickets error:', error);
    res.status(500).json({ message: 'Failed to fetch tickets.', error: error.message });
  }
};

exports.cancelTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user._id });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found or unauthorized.' });
    }

    ticket.status = 'cancelled';
    await ticket.save();

    res.status(200).json({ message: 'Ticket cancelled successfully.', ticket });
  } catch (error) {
    console.error('Cancelling ticket error:', error);
    res.status(500).json({ message: 'Failed to cancel ticket.', error: error.message });
  }
};


