import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'passenger',
    licenseNumber: '',
    vehicleType: '',
    termsAccepted: false
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
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.userType === 'driver') {
      if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
      if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({}); // Reset errors on form submission

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
        role: formData.userType,
      };

      // Add additional fields for driver users
      if (formData.userType === 'driver') {
        payload.licenseNumber = formData.licenseNumber;
        payload.vehicleType = formData.vehicleType;
      }

      const response = await axios.post('http://localhost:5000/api/register', payload);
      console.log('User registered successfully', response.data);

      navigate('/login');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: 'passenger',
        licenseNumber: '',
        vehicleType: '',
        termsAccepted: false
      });
    } catch (error) {
      console.error('Error during registration', error);
      setErrors({ submit: error.response?.data?.message || 'Something went wrong' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Nile Way Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form" noValidate>
        <div className="form-row name-section">
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
        </div>

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

        <div className={`form-group ${errors.phone ? 'error' : ''}`}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="password-section">
          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
        </div>

        <div className={`form-group ${errors.userType ? 'error' : ''}`}>
          <label htmlFor="userType">Register As</label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
          </select>
        </div>

        {formData.userType === 'driver' && (
          <>
            <div className={`form-group ${errors.licenseNumber ? 'error' : ''}`}>
              <label htmlFor="licenseNumber">Driver License Number</label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="Enter your license number"
              />
              {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
            </div>

            <div className={`form-group ${errors.vehicleType ? 'error' : ''}`}>
              <label htmlFor="vehicleType">Vehicle Type</label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
              >
                <option value="">Select Vehicle Type</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="van">Van</option>
                <option value="truck">Truck</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
              {errors.vehicleType && <span className="error-message">{errors.vehicleType}</span>}
            </div>
          </>
        )}

        <div className={`form-group checkbox-group ${errors.termsAccepted ? 'error' : ''}`}>
          <div className="terms-wrapper">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label htmlFor="termsAccepted" className="terms-label">
              I agree to the <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a>
            </label>
          </div>
          {errors.termsAccepted && <span className="error-message">{errors.termsAccepted}</span>}
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
              Registering...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/RegistrationForm.css';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     userType: 'passenger',
//     licenseNumber: '',
//     vehicleType: '',
//     termsAccepted: false
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
//     if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
//     if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
//     if (!/^\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
//     if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//     if (formData.userType === 'driver') {
//       if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
//       if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
//     }
//     if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     setErrors({});

//     try {
//       const payload = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phoneNumber: formData.phone,
//         password: formData.password,
//         role: formData.userType,
//       };

//       if (formData.userType === 'driver') {
//         payload.licenseNumber = formData.licenseNumber;
//         payload.vehicleType = formData.vehicleType;
//       }

//       const response = await axios.post('http://localhost:5000/api/register', payload);

//       console.log('Registration success:', response.data);
//       navigate('/login');

//       // Reset form
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         password: '',
//         confirmPassword: '',
//         userType: 'passenger',
//         licenseNumber: '',
//         vehicleType: '',
//         termsAccepted: false
//       });

//     } catch (error) {
//       const message = error.response?.data?.message || 'Registration failed';
//       setErrors((prevErrors) => ({ ...prevErrors, submit: message }));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="registration-container">
//       <h2 className="registration-title">Nile Way Registration</h2>
//       <form onSubmit={handleSubmit} className="registration-form" noValidate>
//         {/* ... كل عناصر الفورم كما هي بدون تغيير ... */}
//         {/* لم يتم حذف أي inputs أو design عناصر UI، بس عدلنا logic الإرسال */}

//         {/* عرض رسالة خطأ من السيرفر لو فيه */}
//         {errors.submit && <div className="submit-error">{errors.submit}</div>}

//         <button 
//           type="submit" 
//           className="submit-btn"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <>
//               <span className="spinner"></span>
//               Registering...
//             </>
//           ) : (
//             'Create Account'
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;
