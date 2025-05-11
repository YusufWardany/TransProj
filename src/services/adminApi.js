// src/services/adminApi.js
import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/admin';

// Create axios instance
const adminApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor to add auth token
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
adminApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle network errors
    if (error.message === 'Network Error') {
      return Promise.reject('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الشبكة');
    }

    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      return Promise.reject('انتهت مهلة الطلب. يرجى المحاولة مرة أخرى');
    }

    // Handle HTML responses
    const contentType = error.response?.headers?.['content-type'];
    if (contentType && contentType.includes('text/html')) {
      return Promise.reject('استجابة غير متوقعة من الخادم');
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
      return Promise.reject('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى');
    }

    // Arabic error messages mapping
    const arabicMessages = {
      'Trip validation failed': 'فشل التحقق من صحة بيانات الرحلة',
      'Invalid departure time': 'وقت المغادرة غير صالح',
      'Arrival must be after departure': 'يجب أن يكون وقت الوصول بعد وقت المغادرة',
      'Price must be positive': 'يجب أن يكون السعر رقم موجب',
      'Seats must be at least 1': 'يجب أن يكون عدد المقاعد 1 على الأقل',
      'Trip not found': 'الرحلة غير موجودة',
      'Unauthorized': 'غير مسموح بالوصول',
      'Forbidden': 'غير مسموح بالوصول',
      'Not Found': 'الصفحة غير موجودة',
      'Failed to add trip': 'فشل في إضافة الرحلة',
      'Failed to update trip': 'فشل في تعديل الرحلة'
    };

    // Extract error message
    let message = error.response?.data?.message || 
                error.message || 
                'حدث خطأ غير متوقع';

    // Check if we have an Arabic translation
    if (arabicMessages[message]) {
      message = arabicMessages[message];
    } else if (error.response?.data?.errors) {
      // Handle validation errors
      const firstError = Object.values(error.response.data.errors)[0];
      message = firstError.message || firstError;
    }

    return Promise.reject(message);
  }
);

// Trip API methods
export const fetchTrips = async (params = {}) => {
  return adminApi.get('/trips', { params });
};

export const createTrip = async (tripData) => {
  return adminApi.post('/trips', tripData);
};

export const getTrip = async (id) => {
  return adminApi.get(`/trips/${id}`);
};

export const updateTrip = async (id, tripData) => {
  return adminApi.put(`/trips/${id}`, tripData);
};

export const deleteTrip = async (id) => {
  return adminApi.delete(`/trips/${id}`);
};

// Dashboard API methods
export const getDashboardStats = async () => {
  return adminApi.get('/dashboard/stats');
};

// Authentication API methods
export const loginAdmin = async (credentials) => {
  return adminApi.post('/login', credentials);
};

export const getAdminProfile = async () => {
  return adminApi.get('/profile');
};