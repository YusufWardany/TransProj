import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css'; // Corrected path
import { RegistrationPage } from '../pages/RegistrationPage';
const LoginForm = () => {

  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Login successful!');
      navigate('/'); // Redirect to home page after login
    } catch (error) {
      setErrors({ ...errors, submit: 'Invalid email or password' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Nile Way Login</h2>
      <form onSubmit={handleSubmit} className="login-form" noValidate>
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
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>

        <div className="login-links">
          <a href="#">Forgot password?</a>
          <a href="#">Don't have an account? Register</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;