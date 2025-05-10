const mongoose = require('mongoose');

const busTicketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked'
  },
  bookingTime: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

busTicketSchema.pre('save', function(next) {
  if (!this.ticketId) {
    const timestamp = Date.now().toString().slice(-6);
    this.ticketId = `BUS-${timestamp}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  next();
});

module.exports = mongoose.model('BusTicket', busTicketSchema);
