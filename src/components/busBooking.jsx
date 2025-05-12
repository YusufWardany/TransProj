import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/busBooking.css';

const BusBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [availableBuses, setAvailableBuses] = useState([]);

  const cities = [
    'القاهرة', 'الإسكندرية', 'الأقصر', 'أسوان', 'شرم الشيخ',
    'الغردقة', 'الجيزة', 'بورسعيد', 'السويس', 'دمياط'
  ];

  const discounts = {
    'NILE10': 10,
    'EGYPT20': 20,
    'TRAVEL30': 30
  };

  const handleSearch = async () => {
  if (!fromCity || !toCity) {
    return alert('من فضلك اختر المدن');
  }

  const dateStr = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    const response = await fetch(
      `http://localhost:5000/api/buses/search?from=${fromCity}&to=${toCity}&date=${dateStr}`
    );

    if (!response.ok) {
      throw new Error('حدث خطأ أثناء جلب الرحلات');
    }

    const data = await response.json();

    // Format bus data to match frontend expectations
    const formattedBuses = data.map((bus) => ({
      id: bus._id,
      company: bus.busName,
      departure: new Date(bus.departureTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      arrival: new Date(bus.arrivalTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      price: bus.fare,
      seats: bus.totalSeats,
      type: 'غير محدد' // أو ممكن تجيب نوع الأتوبيس لو موجود في الـ schema
    }));

    setAvailableBuses(formattedBuses);
  } catch (error) {
    console.error('خطأ في جلب الرحلات:', error);
    alert('حدث خطأ أثناء البحث عن الرحلات');
  }
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