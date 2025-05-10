import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginForm from './components/LoginForm'; // Keep only one LoginForm import
import './styles/global.css';
import ContactPage from './components/contactPage';
import BusBooking from './components/busBooking';
import FlightBooking from './components/flightBooking';
import TrainBooking from './components/trainBooking';
import DiscountsPage from './components/discountPage'; 
import FeedbackPage from './components/feedbackPage';
import AdminRoute from './components/auth/AdminRoute';
import AdminDashboard from './components/admin/DashBoard';
import AdminSidebar from './components/admin/AdminSidebar';
import TripList from './components/admin/TripList';



const isAuthenticated = () => {
  // In a real app, you would check for a valid token or session
  return localStorage.getItem('isAdminAuthenticated') === 'true';
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};


const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <Routes>
           <Route path="/admin" element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }></Route>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="trips" element={<TripList />} />
          {}
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/bus-booking" element={<BusBooking />} />
        <Route path="/flight-booking" element={<FlightBooking />} />
        <Route path="/train-booking" element={<TrainBooking />} />
        <Route path="/offers" element={<DiscountsPage />} /> {/* Add this route */}
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route 
  path="/admin" 
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  } 
/>


    <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );

  
}

export default App;