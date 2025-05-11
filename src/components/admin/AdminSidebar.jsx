import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';
// filepath: c:\Users\PC\OneDrive\Desktop\transportation\projectweb\projectweb\projectweb\pro\src\components\admin\AdminSidebar.jsx
const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>لوحة التحكم</h2>
      <ul>
        <li>
          <Link to="/admin/dashboard">الرئيسية</Link>
        </li>
        <li>
          <Link to="/admin/trips">إدارة الرحلات</Link>
        </li>
        <li>
          <Link to="/admin/bookings">الحجوزات</Link>
        </li>
        <li>
          <Link to="/admin/users">المستخدمين</Link>
        </li>
        <li>
          <Link to="/admin/settings">الإعدادات</Link>
        </li>
        <li>
          <Link to="/logout">تسجيل الخروج</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;