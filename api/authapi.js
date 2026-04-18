import api from '../axios/axios';

export const signupUser = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

export const verifyOtp = async (otpData) => {
  const response = await api.post('/auth/verify-otp', otpData);
  return response.data;
};

export const resendOtp = async (email) => {
  const response = await api.post('/auth/resend-otp', { email });
  return response.data;
};

export const signinUser = async (userData) => {
  const response = await api.post('/auth/signin', userData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (resetData) => {
  const response = await api.post('/auth/reset-password', resetData);
  return response.data;
};

export const getAdminPayments = async () => {
  const response = await api.get('/payments/all');
  return response.data;
};