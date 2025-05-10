const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  passengerName: {
    type: String,
    required: true,
    trim: true
  },
  passengerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  busNumber: {
    type: String,
    required: true
  },
  departureLocation: {
    type: String,
    required: true
  },
  arrivalLocation: {
    type: String,
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to User model
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);
