import React, { useState } from "react";
import logo from "../assets/logo.svg";
import image3 from "../assets/IMAGE3.jpg";
import { useVerifyOtp, useResendOtp } from "../../hook/usehook";

export default function VerifyOTP({ email, setView, setUser }) {
  const [otp, setOtp] = useState("");
  const { mutate: verify, isPending, isError, error, isSuccess } = useVerifyOtp();
  const { mutate: resend, isPending: isResending, isSuccess: isResendSuccess, error: resendError } = useResendOtp();

  const handleSubmit = (e) => {
    e.preventDefault();
    verify({ email, otp }, {
      onSuccess: (data) => {
        if (setUser) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
        }
        setTimeout(() => setView('homepage'), 2000);
      },
    });
  };

  const handleResend = () => {
    resend(email);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative w-full max-w-xl">
        <div className="absolute -inset-5 rounded-3xl blur-2xl bg-[radial-gradient(circle,rgba(255,111,0,0.2),transparent_70%)] -z-10" />

        <div className="bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[30px] px-10 py-12 text-center">
          <img
            src={logo}
            alt="YummyFood Logo"
            className="h-[120px] w-[120px] bg-white rounded-full p-4 mx-auto mb-8 object-contain border-4 border-[#ff6f00] shadow-2xl"
          />

          <h2 className="text-[25px] font-extrabold text-white mb-3 tracking-tight">
            Verify Email ✉️
          </h2>
          <p className="text-white/80 text-[18px] mb-8">
            We've sent a 6-digit code to <br />
            <span className="text-[#ff6f00] font-bold">{email}</span>
          </p>

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-sm">
              Email verified! Redirecting to YUMMY...
            </div>
          )}

          {isError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <p>
                {error.response?.data?.error === "Token has expired"
                  ? "This code has expired. Please click 'Resend New Code' below."
                  : error.response?.data?.error || "Invalid code. Please check and try again."}
              </p>
            </div>
          )}

          {isResendSuccess && (
            <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-xl text-blue-200 text-sm">
              A new code has been sent to your email.
            </div>
          )}

          {resendError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
              {resendError.response?.data?.error || "Failed to resend code."}
            </div>
          )}

          <form className="text-left" onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="block text-sm font-semibold text-white mb-4 text-center">
                Enter Verification Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter code"
                required
                className="w-full px-6 py-4 text-center text-2xl font-bold rounded-2xl border border-white/30 bg-white/10 text-white placeholder-white/20 focus:bg-white/20 focus:border-[#ff6f00] outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isPending || otp.length < 4}
              className="w-full py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-br from-[#ff6f00] to-[#ff8c42] shadow-lg hover:-translate-y-1 transition disabled:opacity-50"
            >
              {isPending ? "Verifying..." : "Verify & Continue"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm mb-2">Didn't receive the code?</p>
            <button 
              onClick={handleResend}
              disabled={isResending}
              className="text-[#ff6f00] font-bold hover:text-white transition underline disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend New Code"}
            </button>
          </div>

          <button 
            onClick={() => setView('signup')}
            className="mt-6 text-white/40 text-[12px] hover:text-white transition underline"
          >
            Entered the wrong email? Go back
          </button>
        </div>
      </div>
    </div>
  );
}