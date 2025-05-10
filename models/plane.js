// planeSchema.js
const mongoose = require('mongoose');

// Plane Schema (admin will manage these)
const planeSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true
  },
  airline: {
    type: String,
    required: true,
    enum: ['مصر للطيران', 'نيل للطيران', 'الخطوط الجوية العربية', 'FlyEgypt', 'Air Cairo']
  },
  departureCity: {
    type: String,
    required: true,
    enum: ['القاهرة', 'الإسكندرية', 'الأقصر', 'أسوان', 'شرم الشيخ', 'الغردقة', 'الجيزة', 'بورسعيد', 'السويس', 'دمياط']
  },
  arrivalCity: {
    type: String,
    required: true,
    enum: ['القاهرة', 'الإسكندرية', 'الأقصر', 'أسوان', 'شرم الشيخ', 'الغردقة', 'الجيزة', 'بورسعيد', 'السويس', 'دمياط']
  },
  departureDateTime: {
    type: Date,
    required: true
  },
  arrivalDateTime: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  stops: {
    type: String,
    enum: ['مباشر', 'غير مباشر'],
    default: 'مباشر'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  aircraftType: {
    type: String
  },
  baggageAllowance: {
    economy: { type: Number, default: 20 }, // in kg
    business: { type: Number, default: 30 } // in kg
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Plane model
const Plane = mongoose.model('Plane', planeSchema);

module.exports = Plane;
