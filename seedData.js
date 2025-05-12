const mongoose = require('mongoose');
const Plane = require('./models/plane');  // تأكد من مسار النموذج بشكل صحيح

mongoose.connect('MONGODB_URI=mongodb+srv://Yusuf_Wardany:POLO9090!@cluster0.bve6wh8.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  await mongoose.connection.db.dropDatabase(); // احذف الداتا القديمة إذا كان ذلك مناسبًا لك

  // بيانات الطائرات لتجربتها
  const planes = [
    {
      flightNumber: 'EG123',
      airline: 'مصر للطيران',
      departureCity: 'القاهرة',
      arrivalCity: 'الإسكندرية',
      departureDateTime: new Date('2025-06-01T12:00:00'),
      arrivalDateTime: new Date('2025-06-01T13:00:00'),
      duration: '1h',
      stops: 'مباشر',
      price: 1200,
      availableSeats: 60,
      aircraftType: 'Airbus A320',
      baggageAllowance: { economy: 20, business: 30 }
    },
    {
      flightNumber: 'MS456',
      airline: 'مصر للطيران',
      departureCity: 'الإسكندرية',
      arrivalCity: 'الجيزة',
      departureDateTime: new Date('2025-06-10T14:00:00'),
      arrivalDateTime: new Date('2025-06-10T15:30:00'),
      duration: '1h 30m',
      stops: 'غير مباشر',
      price: 1500,
      availableSeats: 50,
      aircraftType: 'Boeing 737',
      baggageAllowance: { economy: 20, business: 30 }
    },
    {
      flightNumber: 'NE789',
      airline: 'نيل للطيران',
      departureCity: 'شرم الشيخ',
      arrivalCity: 'الغردقة',
      departureDateTime: new Date('2025-06-15T08:00:00'),
      arrivalDateTime: new Date('2025-06-15T09:00:00'),
      duration: '1h',
      stops: 'مباشر',
      price: 900,
      availableSeats: 80,
      aircraftType: 'Airbus A320',
      baggageAllowance: { economy: 20, business: 30 }
    }
  ];

  // إدخال بيانات الطائرات إلى MongoDB
  await Plane.insertMany(planes);
  console.log('Test plane data inserted successfully');
  process.exit();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
