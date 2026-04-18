import React, { useState } from "react";
import logo from "../assets/logo.svg";
import image2 from "../assets/IMAGE2.jpg";
import { useForgotPassword, useResetPassword } from "../../hook/usehook";
import toast from "react-hot-toast";

export default function ResetPassword({ setView }) {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const forgotPasswordMutation = useForgotPassword();
  const resetPasswordMutation = useResetPassword();

  const handleSendCode = (e) => {
    e.preventDefault();
    forgotPasswordMutation.mutate(email, {
      onSuccess: () => {
        toast.success("Verification code sent to your email!");
        setStep(2);
      },
      onError: (err) => {
        toast.error(err.response?.data?.error || "Failed to send code.");
      },
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    resetPasswordMutation.mutate(
      { email, otp: formData.otp, password: formData.password },
      {
        onSuccess: () => {
          toast.success("Password reset successful! Please login.");
          setView("signin");
        },
        onError: (err) => {
          toast.error(err.response?.data?.error || "Reset failed. Check your code.");
        },
      }
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative w-full max-w-xl">
        <div className="bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[30px] px-10 py-12 text-center">
          <img
            src={logo}
            alt="YummyFood Logo"
            className="h-[100px] w-[100px] bg-white rounded-full p-3 mx-auto mb-8 object-contain border-4 border-[#ff6f00] shadow-2xl"
          />

          <h2 className="text-[25px] font-extrabold text-white mb-2 tracking-tight">
            {step === 1 ? "Forgot Password? 🔑" : "Create New Password 🛡️"}
          </h2>
          <p className="text-white/70 text-sm mb-8">
            {step === 1 
              ? "Enter your email and we'll send you a verification code to reset your password."
              : "Enter the code sent to your email and your new password."}
          </p>

          {step === 1 ? (
            <form onSubmit={handleSendCode} className="text-left">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-white mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] outline-none transition"
                />
              </div>
              <button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-br from-[#ff6f00] to-[#ff8c42] shadow-lg hover:-translate-y-1 transition disabled:opacity-50"
              >
                {forgotPasswordMutation.isPending ? "Sending Code..." : "Send Verification Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="text-left">
              <div className="mb-5">
                <label className="block text-sm font-semibold text-white mb-2 ml-1">Verification Code</label>
                <input
                  type="text"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  placeholder="Enter code"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white focus:bg-white/20 focus:border-[#ff6f00] outline-none transition"
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-white mb-2 ml-1">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min. 6 characters"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.644C3.483 8.653 7.081 5.5 12 5.5s8.517 3.153 9.964 6.178c.066.124.066.259 0 .384-1.447 3.025-5.046 6.178-9.964 6.178s-8.517-3.153-9.964-6.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-white mb-2 ml-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repeat new password"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] outline-none transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={resetPasswordMutation.isPending}
                className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-br from-[#ff6f00] to-[#ff8c42] shadow-lg hover:-translate-y-1 transition disabled:opacity-50"
              >
                {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <button
            onClick={() => setView("signin")}
            className="mt-6 text-sm text-white/60 hover:text-white transition font-medium"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}