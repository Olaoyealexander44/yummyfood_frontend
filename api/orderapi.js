import api from '../axios/axios';

// Function to save a new order
export const saveOrder = async (orderData) => {
  const response = await api.post('/orders/create', orderData);
  return response.data;
};

// Function to fetch past orders
export const getOrderHistory = async () => {
  const response = await api.get('/orders/history');
  return response.data;
};

// Function for admin to fetch all orders
export const getAllOrders = async () => {
  const response = await api.get('/orders/all');
  return response.data;
};

// Function for admin to update order status (confirm or cancel)
export const updateOrderStatus = async (orderId, status) => {
  const response = await api.patch(`/orders/status/${orderId}`, { status });
  return response.data;
};