import React, { useState } from 'react';

const AppointmentForm = ({ serviceType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceType || '',
    message: '',
    date: '',
    timezone: 'Africa - Cairo (GMT+02:00)',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Submitted:', formData);
    alert('تم إرسال الحجز بنجاح!');
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <label>
        الاسم الكامل
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>

      <label>
        البريد الإلكتروني
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>

      <label>
        رقم الهاتف
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>

      <label>
        التاريخ المطلوب
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </label>

      <label>
        المنطقة الزمنية
        <select name="timezone" value={formData.timezone} onChange={handleChange}>
          <option value="Africa - Cairo (GMT+02:00)">Africa - Cairo (GMT+02:00)</option>
        </select>
      </label>

      <label>
        رسالة إضافية
        <textarea name="message" value={formData.message} onChange={handleChange} />
      </label>

      <button type="submit">إرسال الحجز</button>
    </form>
  );
};

export default AppointmentForm;
