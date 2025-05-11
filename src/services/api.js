import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const bookFlight = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/flights/book`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Flight booking error:', error);
    throw error;
  }
};

export const bookTrain = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/trains/book`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Train booking error:', error);
    throw error;
  }
};

export const getBuses = async (searchParams) => {
  const response = await axios.get(`${API_URL}/buses`, { params: searchParams });
  return response.data;
};

export const bookBus = async (bookingData) => {
  const response = await axios.post(`${API_URL}/buses/book`, bookingData);
  return response.data;
};