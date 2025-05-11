import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/flightBooking.css';
import { bookFlight } from '../services/api';


const FlightBooking = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [availableFlights, setAvailableFlights] = useState([]);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const cities = [
    'القاهرة', 'الإسكندرية', 'الأقصر', 'أسوان', 'شرم الشيخ',
    'الغردقة', 'الجيزة', 'بورسعيد', 'السويس', 'دمياط'
  ];

  const discounts = {
    'FLY10': 10,
    'EGYPTAIR15': 15,
    'TRAVEL20': 20
  };
  const handleSubmit = async (formData) => {
    try {
      const result = await bookFlight(formData);
      // Handle success (show confirmation, redirect, etc.)
    } catch (error) {
      // Handle error
    }
  };

  const handleSearch = () => {
    // Simulate API call to get available flights
    const mockFlights = [
      {
        id: 1,
        airline: 'مصر للطيران',
        departure: '08:00 ص',
        arrival: '10:00 ص',
        price: 1500,
        duration: '2h',
        stops: 'غير مباشر'
      },
      {
        id: 2,
        airline: 'نيل للطيران',
        departure: '02:00 م',
        arrival: '04:00 م',
        price: 1200,
        duration: '2h',
        stops: 'مباشر'
      },
      {
        id: 3,
        airline: 'الخطوط الجوية العربية',
        departure: '08:00 م',
        arrival: '11:00 م',
        price: 1800,
        duration: '3h',
        stops: 'مباشر'
      }
    ];
    setAvailableFlights(mockFlights);
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
    <div className="flight-booking-container">
      <h1 className="booking-title">حجز تذاكر الطيران</h1>
      
      <div className="search-section">
        <div className="trip-type">
          <label>
            <input
              type="radio"
              name="tripType"
              checked={!isRoundTrip}
              onChange={() => setIsRoundTrip(false)}
            />
            ذهاب فقط
          </label>
          <label>
            <input
              type="radio"
              name="tripType"
              checked={isRoundTrip}
              onChange={() => setIsRoundTrip(true)}
            />
            ذهاب وعودة
          </label>
        </div>

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
          <label>تاريخ الذهاب</label>
          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            minDate={new Date()}
            className="date-picker-input"
            dateFormat="yyyy/MM/dd"
          />
        </div>

        {isRoundTrip && (
          <div className="form-group">
            <label>تاريخ العودة</label>
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              minDate={departureDate}
              className="date-picker-input"
              dateFormat="yyyy/MM/dd"
            />
          </div>
        )}

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

      {availableFlights.length > 0 && (
        <div className="results-section">
          <h2>الرحلات المتاحة</h2>
          <div className="flights-list">
            {availableFlights.map(flight => (
              <div key={flight.id} className="flight-card">
                <div className="flight-info">
                  <h3>{flight.airline}</h3>
                  <div className="flight-times">
                    <div>
                      <span className="time">{flight.departure}</span>
                      <span>إقلاع</span>
                    </div>
                    <div className="flight-duration">
                      <span>{flight.duration}</span>
                    </div>
                    <div>
                      <span className="time">{flight.arrival}</span>
                      <span>وصول</span>
                    </div>
                  </div>
                  <p>توقف: {flight.stops}</p>
                </div>
                <div className="flight-price">
                  <p className="original-price">{flight.price} جنيه</p>
                  {appliedDiscount > 0 && (
                    <p className="final-price">
                      {calculateFinalPrice(flight.price).toFixed(2)} جنيه
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

export default FlightBooking;