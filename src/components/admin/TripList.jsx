import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/admin/trips');
        const data = await response.json();
        setTrips(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trips:', error);
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="trip-list">
      <div className="header">
        <h1>إدارة الرحلات</h1>
        <Link to="/admin/trips/new" className="btn-add">
          إضافة رحلة جديدة
        </Link>
      </div>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>النوع</th>
              <th>من</th>
              <th>إلى</th>
              <th>التاريخ</th>
              <th>السعر</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.id}</td>
                <td>{trip.type}</td>
                <td>{trip.from}</td>
                <td>{trip.to}</td>
                <td>{new Date(trip.date).toLocaleDateString()}</td>
                <td>{trip.price} ج.م</td>
                <td>
                  <Link to={`/admin/trips/edit/${trip.id}`} className="btn-edit">
                    تعديل
                  </Link>
                  <button className="btn-delete">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TripList;