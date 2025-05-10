// controllers/contactController.js
const Contact = require('../models/contact');

// Add a contact form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = await Contact.findOne();
    if (!contact) {
      const newContact = new Contact({
        submissions: [{ name, email, phone, message }]
      });
      await newContact.save();
      return res.status(201).json({ message: 'Contact form submitted successfully!' });
    }

    contact.submissions.push({ name, email, phone, message });
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit contact form', error: err.message });
  }
};

// Get all contact submissions (Admin only)
exports.getSubmissions = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) return res.status(404).json({ message: 'No contact data found.' });
    res.status(200).json({ submissions: contact.submissions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve submissions', error: err.message });
  }
};

// Update a submission status (Admin)
exports.updateSubmissionStatus = async (req, res) => {
  try {
    const { submissionIndex, status, response } = req.body;
    const contact = await Contact.findOne();

    if (!contact || !contact.submissions[submissionIndex]) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    contact.submissions[submissionIndex].status = status;
    if (response) {
      contact.submissions[submissionIndex].response = {
        message: response.message,
        responder: req.user.name || 'Admin',
        responseDate: new Date()
      };
    }

    await contact.save();
    res.status(200).json({ message: 'Submission updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update submission', error: err.message });
  }
};

// Update contact info (Admin only)
exports.updateContactInfo = async (req, res) => {
  try {
    const updates = req.body;
    let contact = await Contact.findOne();

    if (!contact) {
      contact = new Contact({ contactInfo: updates });
    } else {
      contact.contactInfo = { ...contact.contactInfo, ...updates };
      contact.updatedBy = req.user._id;
    }

    await contact.save();
    res.status(200).json({ message: 'Contact info updated successfully.', contactInfo: contact.contactInfo });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update contact info', error: err.message });
  }
};
