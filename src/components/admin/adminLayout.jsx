// src/components/admin/AdminLayout.jsx
import React from 'react';
import AdminSidebar from './AdminSidebar';
import '../../styles/AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;