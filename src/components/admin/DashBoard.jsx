import React, { useState, useEffect } from 'react';
import TripForm from './TripForm';
import TripList from './TripList';
import { fetchTrips, deleteTrip, createTrip, updateTrip, getDashboardStats } from '../../services/adminApi';
import '../../styles/adminDashBoard.css';


const DashBoard = () => {
  const [trips, setTrips] = useState([]);
  const [stats, setStats] = useState({
    totalTrips: 0,
    todayBookings: 0,
    newUsers: 0
  });
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [loading, setLoading] = useState({
    page: true,
    action: false
  });
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(prev => ({ ...prev, page: true }));
    setError(null);
    try {
      const [tripsData, statsData] = await Promise.all([
        fetchTrips(),
        getDashboardStats()
      ]);
      setTrips(tripsData);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, page: false }));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTrip = () => {
    setEditingTrip(null);
    setShowForm(true);
  };

  const handleEditTrip = (trip) => {
    setEditingTrip(trip);
    setShowForm(true);
  };

  const handleDeleteTrip = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الرحلة؟')) return;
    
    setLoading(prev => ({ ...prev, action: true }));
    try {
      await deleteTrip(id);
      await loadData();
      alert('تم حذف الرحلة بنجاح');
    } catch (err) {
      console.error('Delete error:', err);
      alert('حدث خطأ أثناء حذف الرحلة: ' + err.message);
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  const handleSubmitTrip = async (tripData) => {
    setLoading(prev => ({ ...prev, action: true }));
    try {
      if (editingTrip) {
        await updateTrip(editingTrip._id, tripData);
      } else {
        await createTrip(tripData);
      }
      
      await loadData();
      setShowForm(false);
      alert(editingTrip ? 'تم تحديث الرحلة بنجاح' : 'تم إضافة الرحلة بنجاح');
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  if (loading.page) {
    return (
      <div className="admin-dashboard loading-state" dir="rtl">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" dir="rtl">
      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}
      
      <h1>لوحة التحكم الرئيسية</h1>
      
      {showForm ? (
        <TripForm 
          trip={editingTrip} 
          onSubmit={handleSubmitTrip}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <div className="dashboard-actions">
            <button 
              onClick={handleAddTrip} 
              className="btn-add"
              disabled={loading.action}
            >
              {loading.action ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                'إضافة رحلة جديدة'
              )}
            </button>
          </div>

          <div className="stats-cards">
            <div className="stat-card">
              <h3>إجمالي الرحلات</h3>
              <p>{stats.totalTrips}</p>
            </div>
            
            <div className="stat-card">
              <h3>الحجوزات اليوم</h3>
              <p>{stats.todayBookings}</p>
            </div>
            
            <div className="stat-card">
              <h3>المستخدمين الجدد</h3>
              <p>{stats.newUsers}</p>
            </div>
          </div>
          
          <TripList 
            trips={trips} 
            onEdit={handleEditTrip}
            onDelete={handleDeleteTrip}
            isLoading={loading.action}
          />
        </>
      )}
    </div>
  );
};

export default DashBoard;