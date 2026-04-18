import { useMutation, useQuery } from '@tanstack/react-query';
import { signupUser, verifyOtp, signinUser, resendOtp, getAdminPayments, forgotPassword, resetPassword } from '../api/authapi';

export const useSignup = () => {
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log('Signup success:', data.message);
    },
    onError: (error) => {
      console.error('Signup error:', error.response?.data?.error || error.message);
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      // Save token to local storage on successful verification
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('OTP verified successfully');
    },
    onError: (error) => {
      console.error('OTP error:', error.response?.data?.error || error.message);
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: (data) => {
      console.log('OTP resent successfully:', data.message);
    },
    onError: (error) => {
      console.error('Resend error:', error.response?.data?.error || error.message);
    },
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: signinUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('Signin successful');
    },
    onError: (error) => {
      console.error('Signin error:', error.response?.data?.error || error.message);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      console.log('Reset email sent:', data.message);
    },
    onError: (error) => {
      console.error('Forgot password error:', error.response?.data?.error || error.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      console.log('Password reset successful:', data.message);
    },
    onError: (error) => {
      console.error('Reset password error:', error.response?.data?.error || error.message);
    },
  });
};

export const useAdminPayments = () => {
  return useQuery({
    queryKey: ['adminPayments'],
    queryFn: getAdminPayments,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};