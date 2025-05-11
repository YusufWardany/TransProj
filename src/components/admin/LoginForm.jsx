// src/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/LoginForm.css';
import '../../styles/AdminLogin.css';
// filepath: c:\Users\PC\OneDrive\Desktop\transportation\projectweb\projectweb\projectweb\pro\src\components\admin\LoginForm.jsximport './styles/AdminLogin.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Check if coming from admin panel
  const isAdminLogin = location.pathname === '/admin/login';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Admin credentials (in real app, use API call)
    if (isAdminLogin && username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } 
    // Regular user login (if needed)
    else if (!isAdminLogin && username && password) {
      // Handle regular user login
      navigate('/user/dashboard');
    } 
    else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isAdminLogin ? 'تسجيل دخول المشرف' : 'تسجيل الدخول'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">اسم المستخدم:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">كلمة المرور:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            {isAdminLogin ? 'دخول لوحة التحكم' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;