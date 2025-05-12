import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAdminAuth } from './auth';
// filepath: c:\Users\PC\OneDrive\Desktop\transportation\projectweb\projectweb\projectweb\pro\src\components\auth\AdminRoute.jsx
const AdminRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      const isAdmin = await checkAdminAuth();
      if (!isAdmin) {
        navigate('/admin/login');
      }
    };
    verifyAdmin();
  }, [navigate]);

  return children;
};

export default AdminRoute;