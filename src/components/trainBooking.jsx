import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/trainBooking.css';

const TrainBooking = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [availableTrains, setAvailableTrains] = useState([]);

  const stations = [
    'القاهرة', 'الإسكندرية', 'الأقصر', 'أسوان', 'الجيزة',
    'بورسعيد', 'السويس', 'دمياط', 'المنصورة', 'طنطا'
  ];

  const discounts = {
    'TRAIN10': 10,
    'EGYPTRAIL15': 15,
    'TRAVEL20': 20
  };

  const handleSearch = () => {
    // Simulate API call to get available trains
    const mockTrains = [
      {
        id: 1,
        name: 'القطار السريع',
        departure: '08:00 ص',
        arrival: '12:00 م',
        price: 250,
        duration: '4h',
        class: 'درجة أولى'
      },
      {
        id: 2,
        name: 'قطار النيل',
        departure: '02:00 م',
        arrival: '06:00 م',
        price: 180,
        duration: '4h',
        class: 'درجة ثانية'
      },
      {
        id: 3,
        name: 'قطار الدلتا',
        departure: '08:00 م',
        arrival: '11:00 م',
        price: 200,
        duration: '3h',
        class: 'درجة أولى'
      }
    ];
    setAvailableTrains(mockTrains);
  };

  const applyDiscount = () => {
    if (discounts[discountCode]) {
      setAppliedDiscount(discounts[discountCode]);
      alert(`تم تطبيق خصم ${discounts[discountCode]}%`);
    } else {
      alert('كود الخصم غير صالح');
    }
  };

  const calculateFinalPrice = (basePrice) => {
    return basePrice * (1 - appliedDiscount / 100);
  };

  return (
    <div className="train-booking-container">
      <h1 className="booking-title">حجز تذاكر القطارات</h1>
      
      <div className="search-section">
        <div className="form-group">
          <label>من</label>
          <select 
            value={fromStation} 
            onChange={(e) => setFromStation(e.target.value)}
          >
            <option value="">اختر المحطة</option>
            {stations.map(station => (
              <option key={station} value={station}>{station}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>إلى</label>
          <select 
            value={toStation} 
            onChange={(e) => setToStation(e.target.value)}
          >
            <option value="">اختر المحطة</option>
            {stations.map(station => (
              <option key={station} value={station}>{station}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>تاريخ السفر</label>
          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            minDate={new Date()}
            className="date-picker-input"
            dateFormat="yyyy/MM/dd"
          />
        </div>

        <div className="form-group">
          <label>عدد المسافرين</label>
          <input 
            type="number" 
            min="1" 
            max="10" 
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
          />
        </div>

        <button className="search-btn" onClick={handleSearch}>
          بحث عن قطارات
        </button>
      </div>

      <div className="discount-section">
        <h3>هل لديك كود خصم؟</h3>
        <div className="discount-input">
          <input 
            type="text" 
            placeholder="أدخل كود الخصم"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button onClick={applyDiscount}>تطبيق الخصم</button>
        </div>
        {appliedDiscount > 0 && (
          <p className="discount-applied">خصم {appliedDiscount}% مطبق</p>
        )}
      </div>

      {availableTrains.length > 0 && (
        <div className="results-section">
          <h2>القطارات المتاحة</h2>
          <div className="trains-list">
            {availableTrains.map(train => (
              <div key={train.id} className="train-card">
                <div className="train-info">
                  <h3>{train.name}</h3>
                  <div className="train-times">
                    <div>
                      <span className="time">{train.departure}</span>
                      <span>إقلاع</span>
                    </div>
                    <div className="train-duration">
                      <span>{train.duration}</span>
                    </div>
                    <div>
                      <span className="time">{train.arrival}</span>
                      <span>وصول</span>
                    </div>
                  </div>
                  <p>الفئة: {train.class}</p>
                </div>
                <div className="train-price">
                  <p className="original-price">{train.price} جنيه</p>
                  {appliedDiscount > 0 && (
                    <p className="final-price">
                      {calculateFinalPrice(train.price).toFixed(2)} جنيه
                    </p>
                  )}
                  <button className="book-btn">احجز الآن</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainBooking;