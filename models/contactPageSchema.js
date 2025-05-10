const mongoose = require('mongoose');
 
const contactSchema = new mongoose.Schema({
  // Contact form submissions
  submissions: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
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
    message: {
      type: String,
      required: true,
      trim: true
    },
    submissionDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved', 'spam'],
      default: 'new'
    },
    response: {
      message: String,
      responder: String,
      responseDate: Date
    }
  }],
 
  // Contact information (mirroring your React component)
  contactInfo: {
    phone: {
      type: String,
      default: '01550162726'
    },
    email: {
      type: String,
      default: 'nourammar877@gmail.com'
    },
    address: {
      english: {
        type: String,
        default: 'Stanley Bridge, Alexandria'
      },
      arabic: {
        type: String,
        default: 'كورنيش البحر، أمام كافيه سيلنترو'
      }
    },
    locations: [{
      name: {
        type: String,
        default: 'Alexandria, Egypt'
      },
      details: {
        type: [String],
        default: ['Stanley Bridge', 'Corniche El Nil', 'Gleem Bay', 'Sea View Spot']
      }
    }],
    workingHours: [{
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      hours: String
    }],
    mapEmbed: {
      type: String,
      default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.7862590584453!2d29.943710075131377!3d31.238305861874497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c4adcecb4cd7%3A0xa2065c94c08a8b87!2sStanley%20Bridge!5e0!3m2!1sen!2seg!4v1682958481674!5m2!1sen!2seg'
    }
  },
 
  // Metadata
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
 
// Pre-save hook to update lastUpdated field
contactSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});
 
// Indexes for better query performance
contactSchema.index({ 'submissions.status': 1 });
contactSchema.index({ 'submissions.submissionDate': -1 });
contactSchema.index({ 'submissions.email': 1 });
 
const Contact = mongoose.model('Contact', contactSchema);
 
module.exports = Contact;
 