import axios from 'axios';

const api = axios.create({
  // Use the VITE_API_URL environment variable if set (standard for Vite deployments)
  baseURL: import.meta.env.VITE_API_URL || (
    window.location.hostname === 'localhost' 
      ? 'http://localhost:5000/api' 
      : 'https://yummyfood-backend.onrender.com/api'
  ),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;