import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/discountPage.css';

const DiscountsPage = () => {
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [userTrips, setUserTrips] = useState(0);

  // Simulate user trips (in a real app, this would come from backend)
  const calculateLoyaltyDiscount = () => {
    if (userTrips >= 5) return 15;
    if (userTrips >= 3) return 10;
    if (userTrips >= 1) return 5;
    return 0;
  };

  const discounts = {
    'SAVE10': 10,
    'TRAVEL15': 15,
    'NILE20': 20,
    'QR2023': 25 // Special QR code discount
  };

  const applyCodeDiscount = () => {
    if (discounts[discountCode]) {
      setAppliedDiscount(discounts[discountCode]);
      alert(`تم تطبيق خصم ${discounts[discountCode]}%`);
    } else {
      alert('كود الخصم غير صالح');
    }
  };

  const applyQrDiscount = () => {
    if (qrCode === 'NILEWAYQR123') { // Example QR code value
      setAppliedDiscount(25);
      alert('تم تطبيق خصم 25% من كود QR');
    } else {
      alert('كود QR غير صالح');
    }
  };

  const loyaltyDiscount = calculateLoyaltyDiscount();

  return (
    <div className="discounts-container">
      <h1 className="discounts-title">عروضنا وخصوماتنا</h1>
      
      <div className="discounts-grid">
        {/* Loyalty Program Section */}
        <div className="discount-card loyalty-program">
          <h2>برنامج الولاء</h2>
          <p>احصل على خصومات حسب عدد رحلاتك معنا:</p>
          <div className="loyalty-levels">
            <div className={`level ${userTrips >= 1 ? 'active' : ''}`}>
              <span>رحلة واحدة</span>
              <span>5% خصم</span>
            </div>
            <div className={`level ${userTrips >= 3 ? 'active' : ''}`}>
              <span>3 رحلات</span>
              <span>10% خصم</span>
            </div>
            <div className={`level ${userTrips >= 5 ? 'active' : ''}`}>
              <span>5 رحلات+</span>
              <span>15% خصم</span>
            </div>
          </div>
          <p className="current-status">
            عدد رحلاتك الحالية: {userTrips} (خصم {loyaltyDiscount}%)
          </p>
        </div>

        {/* Discount Codes Section */}
        <div className="discount-card code-discount">
          <h2>أكواد الخصم</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="أدخل كود الخصم"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button onClick={applyCodeDiscount}>تطبيق</button>
          </div>
          <div className="active-discount">
            {appliedDiscount > 0 && (
              <p>الخصم الحالي: {appliedDiscount}%</p>
            )}
          </div>
          <div className="available-codes">
            <h3>الأكواد المتاحة:</h3>
            <ul>
              <li>SAVE10 - خصم 10%</li>
              <li>TRAVEL15 - خصم 15%</li>
              <li>NILE20 - خصم 20%</li>
            </ul>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="discount-card qr-discount">
          <h2>خصومات QR</h2>
          <div className="qr-scanner-placeholder">
            <p>مسح كود QR الخاص بك:</p>
            <input
              type="text"
              placeholder="أو أدخل الكود يدوياً"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
            />
            <button onClick={applyQrDiscount}>تطبيق</button>
          </div>
          <p className="qr-hint">
            احصل على كود QR من أحد ممثلينا لخصم خاص
          </p>
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate('/')}>
        العودة للصفحة الرئيسية
      </button>
    </div>
  );
};

export default DiscountsPage;