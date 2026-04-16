import React, { useState } from "react";
import logo from "../assets/logo.svg";
import image3 from "../assets/IMAGE3.jpg";
import { useSignup } from "../../hook/usehook";

export default function Signup({ setView, setEmail }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { mutate, isPending, isError, error, isSuccess } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        setEmail(formData.email);
        setTimeout(() => setView('verify-otp'), 1500);
      },
    });
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
            className="h-[150px] w-[150px] bg-white rounded-full p-4 mx-auto mb-8 object-contain border-4 border-[rgba(255,111,0,0.8)] shadow-2xl hover:scale-110 hover:rotate-6 transition"
          />

          <h2 className="text-[25px] font-extrabold text-white mb-3 tracking-tight drop-shadow">
            Create Account 🚀
          </h2>
          <p className="text-white/80 text-[20px] mb-8">
            Join YummyFood and enjoy tasty meals!
          </p>

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-sm">
              Signup successful! Please check your email for the OTP code.
            </div>
          )}

          {isError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
              {error.response?.data?.error || "An error occurred during signup."}
            </div>
          )}

          <form className="text-left" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-white mb-2 ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] focus:shadow-[0_0_0_4px_rgba(255,111,0,0.2)] focus:-translate-y-0.5 outline-none transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-white mb-2 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] focus:shadow-[0_0_0_4px_rgba(255,111,0,0.2)] focus:-translate-y-0.5 outline-none transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-white mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] focus:shadow-[0_0_0_4px_rgba(255,111,0,0.2)] focus:-translate-y-0.5 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 mt-3 rounded-xl text-white font-bold text-base bg-gradient-to-br from-[#ff6f00] to-[#ff8c42] shadow-lg hover:-translate-y-1 hover:shadow-xl hover:bg-[#e66400] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-sm text-white/80">
            Already have an account?{" "}
            <button 
              onClick={() => setView('signin')}
              className="text-[#ff6f00] font-bold underline hover:text-white transition"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}