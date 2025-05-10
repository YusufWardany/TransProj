// planeTicketSchema.js
const mongoose = require('mongoose');

// PlaneTicket Schema (users book tickets)
const planeTicketSchema = new mongoose.Schema({
  referenceNumber: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plane: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plane',
    required: true
  },
  passengers: [{
    name: {
      type: String,
      required: true
    },
    passportNumber: {
      type: String,
      required: true
    },
    seatNumber: String,
    baggageAllowance: Number
  }],
  seatClass: {
    type: String,
    enum: ['economy', 'business', 'first'],
    default: 'economy'
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'bank_transfer', 'mobile_wallet', 'cash'],
    required: true
  },
  contactInfo: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  specialRequests: String
});

// Create PlaneTicket model
const PlaneTicket = mongoose.model('PlaneTicket', planeTicketSchema);

module.exports = PlaneTicket;
