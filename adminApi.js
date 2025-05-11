import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/admin';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getTrips = async () => {
  const response = await axios.get(`${API_URL}/trips`, getAuthHeaders());
  return response.data;
};

export const addTrip = async (tripData) => {
  const response = await axios.post(`${API_URL}/trips`, tripData, getAuthHeaders());
  return response.data;
};

export const deleteTrip = async (id) => {
  await axios.delete(`${API_URL}/trips/${id}`, getAuthHeaders());
};

// Add other admin API calls as needed