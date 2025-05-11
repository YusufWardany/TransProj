import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createTrip, updateTrip } from '../../services/adminApi';
import '../../styles/TripForm.css';


const TripForm = ({ trip, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'bus',
    from: '',
    to: '',
    departure: new Date(),
    arrival: new Date(),
    price: 0,
    seats: 0,
    status: 'scheduled'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (trip) {
      setFormData({
        ...trip,
        departure: new Date(trip.departure),
        arrival: new Date(trip.arrival)
      });
    }
  }, [trip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        departure: formData.departure.toISOString(),
        arrival: formData.arrival.toISOString()
      };

      if (trip) {
        await updateTrip(trip._id, payload);
      } else {
        await createTrip(payload);
      }

      onSuccess();
    } catch (err) {
      console.error('Trip submission error:', err);
      setError(err.message || 'حدث خطأ أثناء حفظ الرحلة');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateDates = () => {
    return formData.arrival > formData.departure;
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form" dir="rtl">
      <h2>{trip ? 'تعديل الرحلة' : 'إضافة رحلة جديدة'}</h2>
      
      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}

      <div className="form-group">
        <label>نوع الرحلة:</label>
        <select 
          name="type" 
          value={formData.type} 
          onChange={handleChange} 
          required
          disabled={isSubmitting}
        >
          <option value="bus">حافلة</option>
          <option value="train">قطار</option>
          <option value="flight">طيران</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>من:</label>
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>إلى:</label>
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>تاريخ المغادرة:</label>
          <DatePicker
            selected={formData.departure}
            onChange={(date) => setFormData({...formData, departure: date})}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            locale="ar"
            disabled={isSubmitting}
            className="date-picker-input"
          />
        </div>

        <div className="form-group">
          <label>تاريخ الوصول:</label>
          <DatePicker
            selected={formData.arrival}
            onChange={(date) => setFormData({...formData, arrival: date})}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            locale="ar"
            disabled={isSubmitting}
            className="date-picker-input"
            minDate={formData.departure}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>السعر (ج.م):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>عدد المقاعد:</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            min="1"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      {trip && (
        <div className="form-group">
          <label>الحالة:</label>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="scheduled">مجدولة</option>
            <option value="ongoing">قيد التنفيذ</option>
            <option value="completed">مكتملة</option>
            <option value="cancelled">ملغاة</option>
          </select>
        </div>
      )}

      <div className="form-actions">
        <button 
          type="button" 
          className="btn-cancel" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          إلغاء
        </button>
        <button 
          type="submit" 
          className="btn-submit"
          disabled={isSubmitting || !validateDates()}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> جاري الحفظ...
            </>
          ) : trip ? (
            'حفظ التعديلات'
          ) : (
            'إضافة الرحلة'
          )}
        </button>
      </div>
    </form>
  );
};

export default TripForm;