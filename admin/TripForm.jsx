import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const TripForm = ({ onSubmit }) => {
  const [tripData, setTripData] = useState({
    type: 'bus',
    departure: '',
    destination: '',
    departureTime: new Date(),
    arrivalTime: new Date(),
    price: 0,
    seats: 0,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tripData);
    setTripData({
      type: 'bus',
      departure: '',
      destination: '',
      departureTime: new Date(),
      arrivalTime: new Date(),
      price: 0,
      seats: 0,
      description: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <h2>Add New Trip</h2>
      
      <div className="form-group">
        <label>Trip Type:</label>
        <select name="type" value={tripData.type} onChange={handleChange}>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="flight">Flight</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Departure City:</label>
          <input
            type="text"
            name="departure"
            value={tripData.departure}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            value={tripData.destination}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Departure Time:</label>
          <DatePicker
            selected={tripData.departureTime}
            onChange={(date) => setTripData({...tripData, departureTime: date})}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>

        <div className="form-group">
          <label>Arrival Time:</label>
          <DatePicker
            selected={tripData.arrivalTime}
            onChange={(date) => setTripData({...tripData, arrivalTime: date})}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Price ($):</label>
          <input
            type="number"
            name="price"
            value={tripData.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Available Seats:</label>
          <input
            type="number"
            name="seats"
            value={tripData.seats}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={tripData.description}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-btn">Add Trip</button>
    </form>
  );
};

export default TripForm;