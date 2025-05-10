const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 
const adminSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  profileImage: {
    type: String,
    default: 'default-admin.jpg'
  },
 
  // Authentication
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
 
  // Role and Permissions
  role: {
    type: String,
    enum: ['super-admin', 'admin', 'support', 'operations', 'finance'],
    default: 'admin'
  },
  permissions: {
    userManagement: { type: Boolean, default: false },
    contentManagement: { type: Boolean, default: false },
    bookingManagement: { type: Boolean, default: false },
    financialManagement: { type: Boolean, default: false },
    reportAccess: { type: Boolean, default: false },
    systemSettings: { type: Boolean, default: false }
  },
 
  // Status and Activity
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  loginHistory: [{
    date: Date,
    ipAddress: String,
    device: String
  }],
 
  // Security
  twoFactorAuth: {
    type: Boolean,
    default: false
  },
  securityQuestions: [{
    question: String,
    answer: String
  }],
 
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  updatedAt: Date,
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
 
// Middleware to hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
 
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
 
// Update passwordChangedAt when password is modified
adminSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
 
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
 
// Method to compare passwords
adminSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
 
// Method to check if password was changed after token was issued
adminSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
 
// Method to create password reset token
adminSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
 
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
 
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
 
  return resetToken;
};
 
// Method to generate auth token
adminSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};
 
// Indexes for better performance
adminSchema.index({ email: 1 }, { unique: true });
adminSchema.index({ role: 1 });
adminSchema.index({ isActive: 1 });
adminSchema.index({ createdAt: -1 });
 
const Admin = mongoose.model('Admin', adminSchema);
 
module.exports = Admin;
 