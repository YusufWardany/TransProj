import React, { useState } from 'react';
import '../styles/contactPage.css';

const ContactPage = () => {
  const [message, setMessage] = useState('');

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') {
      alert('Please enter a message');
      return;
    }
    alert('Message sent successfully!');
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleMessageSubmit(e);
    }
  };

  return (
    <div className="wellmart-container">
      {/* Header Section */}
      <div className="wellmart-header">
        <h1>Nileway</h1>
        <h2>تواصل معنا</h2>
        <p>نحن هنا لمساعدتك في كل الاستفساراتك</p>
      </div>

      {/* Main Content */}
      <div className="wellmart-content">
        {/* Left Side - Contact Form */}
        <div className="wellmart-form-section">
          <div className="form-group">
            <label><strong>Name</strong></label>
            <input type="text" placeholder="Enter your name..." />
          </div>
          
          <div className="form-group">
            <label><strong>Email address</strong></label>
            <input type="email" placeholder="Enter your email address..." />
          </div>
          
          <div className="form-group">
            <label><strong>Phone number</strong></label>
            <input type="tel" placeholder="Enter your phone number..." />
          </div>
          
          <div className="form-group">
            <label><strong>Message</strong></label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your message..."
            ></textarea>
            <button 
              onClick={handleMessageSubmit}
              className="message-submit-btn"
            >
              Send Message
            </button>
          </div>
        </div>

        {/* Right Side - Contact Information */}
        <div className="wellmart-info-section">
          {/* Locations */}
          <div className="info-block">
            <h3>Alexandria, Egypt</h3>
            <ul>
              <li><strong>Stanley Bridge</strong></li>
              <ul className="sublist">
                <li>Corniche El Nil</li>
                <li>Gleem Bay</li>
                <li>Sea View Spot</li>
              </ul>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="info-block">
            <h3>تواصل معنا</h3>
            <p>01550162726</p>
            <p>nourammar877@gmail.com</p>
          </div>

          {/* Address */}
          <div className="info-block">
            <h3>العنوان</h3>
            <p>Stanley Bridge, Alexandria<br />
            كورنيش البحر، أمام كافيه سيلنترو</p>
          </div>

          {/* Map */}
          <div className="info-block">
            <h3>خريطة الموقع - Stanley Bridge</h3>
            <iframe
              title="Stanley Bridge Map"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '8px' }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.7862590584453!2d29.943710075131377!3d31.238305861874497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c4adcecb4cd7%3A0xa2065c94c08a8b87!2sStanley%20Bridge!5e0!3m2!1sen!2seg!4v1682958481674!5m2!1sen!2seg"
            ></iframe>
          </div>

          {/* Working Hours */}
          <div className="info-block">
            <h3>Working hours</h3>
            <p>Monday 10:00 – 18:00</p>
            <p>Tuesday 10:00 – 18:00</p>
            <p>Wednesday 10:00 – 18:00</p>
            <p>Thursday 10:00 – 18:00</p>
            <p>Friday 10:00 – 18:00</p>
            <p>Saturday 11:00 – 15:00</p>
            <p>Sunday 11:00 – 15:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
