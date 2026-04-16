import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { saveOrder, getOrderHistory, getAllOrders } from '../api/orderapi';

// Hook to save a new order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: saveOrder,
    onSuccess: () => {
      // Refresh the 'orderHistory' list after a new order is saved
      queryClient.invalidateQueries({ queryKey: ['orderHistory'] });
      console.log('Order saved to database successfully');
    },
    onError: (error) => {
      console.error('Failed to save order:', error.response?.data?.error || error.message);
    }
  });
};

// Hook to load user's past orders
export const useOrderHistory = (options = {}) => {
  return useQuery({
    queryKey: ['orderHistory'],
    queryFn: getOrderHistory,
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    ...options
  });
};

// Hook for admin to load all past orders
export const useAllOrders = (options = {}) => {
  return useQuery({
    queryKey: ['allOrders'],
    queryFn: getAllOrders,
    staleTime: 1000 * 60 * 5,
    ...options
  });
};