import React from 'react';
import '../../styles/TripList.css';

const TripList = ({ trips, onEdit, onDelete }) => {
  return (
    <div className="trip-list-container">
      <h2>قائمة الرحلات</h2>
      {trips.length === 0 ? (
        <p>لا توجد رحلات متاحة</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>النوع</th>
              <th>من</th>
              <th>إلى</th>
              <th>المغادرة</th>
              <th>السعر</th>
              <th>المقاعد</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {trips.map(trip => (
              <tr key={trip._id}>
                <td>
                  {trip.type === 'bus' && 'حافلة'}
                  {trip.type === 'train' && 'قطار'}
                  {trip.type === 'flight' && 'طيران'}
                </td>
                <td>{trip.from}</td>
                <td>{trip.to}</td>
                <td>{new Date(trip.departure).toLocaleString('ar-EG')}</td>
                <td>{trip.price} ج.م</td>
                <td>{trip.seats}</td>
                <td>
                  {trip.status === 'scheduled' && 'مجدولة'}
                  {trip.status === 'ongoing' && 'قيد التنفيذ'}
                  {trip.status === 'completed' && 'مكتملة'}
                  {trip.status === 'cancelled' && 'ملغاة'}
                </td>
                <td>
                  <button 
                    onClick={() => onEdit(trip)}
                    className="btn-edit"
                  >
                    تعديل
                  </button>
                  <button 
                    onClick={() => onDelete(trip._id)}
                    className="btn-delete"
                  >
                    حذف
                  </button>
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