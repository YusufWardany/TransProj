const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/bus.routes');
const trainRoutes = require('./routes/train.routes');
const adminRoutes = require('./routes/admin.routes'); // Add this if you have admin-specific routes
const planeRoutes =require('./routes/plane.routes')

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/planes',planeRoutes)
app.use('/api/trains', trainRoutes);
app.use('/api/admin', adminRoutes); // Protect with admin role middleware

// Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
