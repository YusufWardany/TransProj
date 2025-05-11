// src/components/admin/DashBoard.jsx
import React from 'react';
import '../../styles/adminDashBoard.css';
// filepath: c:\Users\PC\OneDrive\Desktop\transportation\projectweb\projectweb\projectweb\pro\src\components\admin\DashBoard.jsx
const DashBoard = () => {
  return (
    
    <div className="admin-dashboard">

      <h1 style={{color: 'red'}}>ADMIN PANEL IS LOADING - TEST MESSAGE</h1>

      <h1>لوحة التحكم الرئيسية</h1>
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>إجمالي الرحلات</h3>
          <p>24</p>
        </div>
        
        <div className="stat-card">
          <h3>الحجوزات اليوم</h3>
          <p>15</p>
        </div>
        
        <div className="stat-card">
          <h3>المستخدمين الجدد</h3>
          <p>8</p>
        </div>
      </div>
      
      <div className="recent-activity">
        <h2>أحدث الحجوزات</h2>
        <table>
          <thead>
            <tr>
              <th>رقم الحجز</th>
              <th>العميل</th>
              <th>نوع الرحلة</th>
              <th>التاريخ</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1001</td>
              <td>محمد أحمد</td>
              <td>حافلة</td>
              <td>2023-10-15</td>
              <td>مكتمل</td>
            </tr>
            {/* Add more rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoard;