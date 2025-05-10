// src/components/admin/AdminSidebar.jsx
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>لوحة التحكم</h2>
      <nav>
        <ul>
          <li><Link to="/admin/dashboard">الرئيسية</Link></li>
          <li><Link to="/admin/trips">إدارة الرحلات</Link></li>
          <li><Link to="/admin/users">المستخدمين</Link></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;