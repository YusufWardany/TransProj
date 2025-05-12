import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // تأكد من أنك استوردت axios
import '../styles/LoginForm.css'; // المسار الصحيح

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    firstName: '',
    lastName: '',
    role: 'passenger', // إفتراضيًا سيكون المستخدم "passenger"
    phoneNumber: '',
    licenseNumber: '',
    vehicleType: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // لتحديد إذا كنت في وضع "login" أو "register"
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const url = `http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`;
      const response = await axios.post(url, formData);

      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        navigate('/'); // توجيه المستخدم إلى الصفحة الرئيسية أو صفحة الـ dashboard بعد تسجيل الدخول
      } else {
        alert('Registration successful!');
        setIsLogin(true); // بعد التسجيل، التبديل إلى صفحة الدخول
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error);
      setErrors({ ...errors, submit: 'Invalid email or password' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">{isLogin ? 'Nile Way Login' : 'Nile Way Register'}</h2>
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        {!isLogin && (
          <>
            <div className={`form-group ${errors.firstName ? 'error' : ''}`}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className={`form-group ${errors.lastName ? 'error' : ''}`}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className={`form-group ${errors.phoneNumber ? 'error' : ''}`}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>
          </>
        )}

        <div className={`form-group ${errors.email ? 'error' : ''}`}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className={`form-group ${errors.password ? 'error' : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        {errors.submit && <div className="submit-error">{errors.submit}</div>}

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              {isLogin ? 'Logging in...' : 'Registering...'}
            </>
          ) : (
            isLogin ? 'Login' : 'Register'
          )}
        </button>

        <div className="login-links">
          {isLogin ? (
            <>
              <a href="#">Forgot password?</a>
              <a href="#" onClick={() => setIsLogin(false)}>Don't have an account? Register</a>
            </>
          ) : (
            <a href="#" onClick={() => setIsLogin(true)}>Already have an account? Login</a>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
