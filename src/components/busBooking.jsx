import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/busBooking.css';
// src/components/BusBooking.jsx
import React, { useState, useEffect } from 'react';
import { bookBus } from '../services/api';



const BusBooking = () => {
 const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [availableBuses, setAvailableBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const cities = [
    'القاهرة', 'الإسكندرية', 'الأقصر', 'أسوان', 'شرم الشيخ',
    'الغردقة', 'الجيزة', 'بورسعيد', 'السويس', 'دمياط'
  ];

  const discounts = {
    'NILE10': 10,
    'EGYPT20': 20,
    'TRAVEL30': 30
  };

  const handleSearch = () => {
    // Simulate API call to get available buses
    const mockBuses = [
      {
        id: 1,
        company: 'النيل للسياحة',
        departure: '08:00 ص',
        arrival: '12:00 م',
        price: 250,
        seats: 40,
        type: 'VIP'
      },
      {
        id: 2,
        company: 'الاهرام للنقل',
        departure: '10:00 ص',
        arrival: '02:00 م',
        price: 180,
        seats: 32,
        type: 'اقتصادي'
      },
      {
        id: 3,
        company: 'الدلتا السريع',
        departure: '02:00 م',
        arrival: '06:00 م',
        price: 200,
        seats: 36,
        type: 'مكيف'
      }
    ];
    setAvailableBuses(mockBuses);
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
    return basePrice * (1 - appliedDiscount / 100) * passengers;
  };

  return (
    <div className="bus-booking-container">
      <h1 className="booking-title">حجز تذاكر الأتوبيسات</h1>
      
      <div className="search-section">
        <div className="form-group">
          <label>من</label>
          <select 
            value={fromCity} 
            onChange={(e) => setFromCity(e.target.value)}
          >
            <option value="">اختر المدينة</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>إلى</label>
          <select 
            value={toCity} 
            onChange={(e) => setToCity(e.target.value)}
          >
            <option value="">اختر المدينة</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>تاريخ السفر</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            className="date-picker-input"
            dateFormat="yyyy/MM/dd"
          />
        </div>

        <div className="form-group">
          <label>عدد الركاب</label>
          <input 
            type="number" 
            min="1" 
            max="10" 
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
          />
        </div>

        <button className="search-btn" onClick={handleSearch}>
          بحث عن رحلات
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

      {availableBuses.length > 0 && (
        <div className="results-section">
          <h2>الرحلات المتاحة</h2>
          <div className="buses-list">
            {availableBuses.map(bus => (
              <div key={bus.id} className="bus-card">
                <div className="bus-info">
                  <h3>{bus.company}</h3>
                  <p>نوع الأتوبيس: {bus.type}</p>
                  <p>عدد المقاعد: {bus.seats}</p>
                </div>
                <div className="bus-timing">
                  <p>الانطلاق: {bus.departure}</p>
                  <p>الوصول: {bus.arrival}</p>
                </div>
                <div className="bus-price">
                  <p className="original-price">{bus.price} جنيه</p>
                  {appliedDiscount > 0 && (
                    <p className="final-price">
                      {calculateFinalPrice(bus.price).toFixed(2)} جنيه
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

export default BusBooking;