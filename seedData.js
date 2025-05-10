// const mongoose = require('mongoose');
// const Bus = require('./models/bus');      // Adjust path if needed
// const Train = require('./models/train');  // Adjust path if needed

// mongoose.connect('mongodb+srv://HazemOraby:user@cluster0.508f2xj.mongodb.net/test', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(async () => {
//   console.log('Connected to MongoDB');

//   const buses = [
//     {
//       busNumber: 'B100',
//       busName: 'City Express',
//       source: 'Cairo',
//       destination: 'Alexandria',
//       departureTime: new Date('2025-05-05T08:00:00'),
//       arrivalTime: new Date('2025-05-05T11:00:00'),
//       totalSeats: 40,
//       fare: 80,
//       createdBy: null
//     },
//     {
//       busNumber: 'B200',
//       busName: 'Desert Rider',
//       source: 'Cairo',
//       destination: 'Luxor',
//       departureTime: new Date('2025-05-06T07:00:00'),
//       arrivalTime: new Date('2025-05-06T15:00:00'),
//       totalSeats: 50,
//       fare: 150,
//       createdBy: null
//     }
//   ];

//   const trains = [
//     {
//       trainNumber: 'T300',
//       trainName: 'Nile Express',
//       source: 'Cairo',
//       destination: 'Aswan',
//       departureTime: new Date('2025-05-07T06:00:00'),
//       arrivalTime: new Date('2025-05-07T18:00:00'),
//       totalSeats: 100,
//       fare: 200,
//       createdBy: null
//     },
//     {
//       trainNumber: 'T400',
//       trainName: 'Delta Line',
//       source: 'Alexandria',
//       destination: 'Cairo',
//       departureTime: new Date('2025-05-08T09:00:00'),
//       arrivalTime: new Date('2025-05-08T12:00:00'),
//       totalSeats: 80,
//       fare: 90,
//       createdBy: null
//     }
//   ];

//   await Bus.deleteMany();   // Optional: clear existing bus data
//   await Train.deleteMany(); // Optional: clear existing train data

//   await Bus.insertMany(buses);
//   await Train.insertMany(trains);

//   console.log('✅ Sample data inserted!');
//   mongoose.connection.close();
// }).catch(err => {
//   console.error('❌ MongoDB connection error:', err);
// });
























const mongoose = require('mongoose');
const Bus = require('./models/bus');
const Plane = require('./models/plane');
const User = require('./models/user');
const Admin = require('./models/adminSchema');
const PlaneTicket = require('./models/planeTicktes');
const BusTicket = require('./models/BusTickets');
const Booking = require('./models/booking.model');
const Contact = require('./models/contactPageSchema');
const Train = require('./models/train');
const Ticket = require('./models/TrainTickets'); // تأكد أن اسم الملف هو الصحيح

mongoose.connect('mongodb+srv://Yusuf_Wardany:POLO9090!@cluster0.bve6wh8.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  await mongoose.connection.db.dropDatabase();

const user = new User({
  firstName: 'Test',
  lastName: 'User',
  phoneNumber: '0123456789',
  email: 'testuser@example.com',
  password: 'password123'
});
await user.save();

  // Create a test admin
  const admin = new Admin({
    firstName: 'Hazem',
    lastName: 'Oraby',
    email: 'admin@example.com',
    password: 'adminpass123',
    role: 'super-admin'
  });
  await admin.save();

  const buses = [
    {
      busNumber: 'B100',
      busName: 'City Express',
      source: 'Cairo',
      destination: 'Alexandria',
      departureTime: new Date('2025-05-10T08:00:00'),
      arrivalTime: new Date('2025-05-10T11:00:00'),
      totalSeats: 40,
      fare: 80,
      createdBy: admin._id
    }
  ];

  const planes = [
    {
      flightNumber: 'EG123',
      airline: 'مصر للطيران',
      departureCity: 'القاهرة',
      arrivalCity: 'الإسكندرية',
      departureDateTime: new Date('2025-06-01T12:00:00'),
      arrivalDateTime: new Date('2025-06-01T13:00:00'),
      duration: '1h',
      price: 1200,
      availableSeats: 60
    }
  ];

  const createdBuses = await Bus.insertMany(buses);
  const createdPlanes = await Plane.insertMany(planes);

  // Create test bus ticket
  const busTicket = new BusTicket({
    user: user._id,
    bus: createdBuses[0]._id,
    seatNumber: '12A'
  });
  await busTicket.save();

  // Create test plane ticket
  const planeTicket = new PlaneTicket({
    referenceNumber: 'REF12345',
    user: user._id,
    plane: createdPlanes[0]._id,
    passengers: [{
      name: 'Test Passenger',
      passportNumber: 'A1234567',
      seatNumber: '3C',
      baggageAllowance: 20
    }],
    seatClass: 'economy',
    totalPrice: 1200,
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    contactInfo: {
      email: 'testuser@example.com',
      phone: '0123456789'
    }
  });
  await planeTicket.save();

  const booking = new Booking({
    user: user._id,
    bus: createdBuses[0]._id,
    seatNumbers: [5, 6],
    totalAmount: 140,
    status: 'confirmed'
  });
  await booking.save();

  // إدخال Contact
  const contact = new Contact({
    submissions: [
      {
        name: 'Sara Nabil',
        email: 'sara.nabil@example.com',
        phone: '+201001234567',
        message: 'هل تعملون أيام الجمعة؟',
        status: 'new'
      }
    ],
    updatedBy: user._id,
    contactInfo: {
      workingHours: [
        { day: 'Friday', hours: '10:00 AM - 2:00 PM' },
        { day: 'Sunday', hours: '9:00 AM - 5:00 PM' }
      ]
    }
  });
  await contact.save();

  // إدخال Train
  const train = new Train({
    trainNumber: 'TR789',
    trainName: 'Delta Express',
    source: 'Mansoura',
    destination: 'Alexandria',
    departureTime: new Date('2025-05-20T07:30:00'),
    arrivalTime: new Date('2025-05-20T11:00:00'),
    totalSeats: 100,
    fare: 200,
    createdBy: user._id
  });
  await train.save();

  // إدخال Ticket (قطار)
  const ticket = new Ticket({
    passengerName: 'Omar Ali',
    passengerEmail: 'omar.ali@example.com',
    busNumber: 'TR789',
    departureLocation: 'Mansoura',
    arrivalLocation: 'Alexandria',
    departureTime: new Date('2025-05-20T07:30:00'),
    seatNumber: '14B',
    price: 200,
    user: user._id,
    status: 'booked'
  });
  await ticket.save();

  console.log('Test data inserted successfully');
  process.exit();

}).catch(err => {
  console.error('MongoDB connection error:', err);
});
