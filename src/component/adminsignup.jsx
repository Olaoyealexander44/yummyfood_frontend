import React, { useState } from "react";
import logo from "../assets/logo.svg";
import image3 from "../assets/IMAGE3.jpg";
import { useSignup } from "../../hook/usehook";

export default function AdminSignup({ setView, setEmail }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    adminSecret: "", // Added secret key for admin verification
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const { mutate, isPending, isError, error, isSuccess } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming the backend handles admin signup via the same endpoint with a role or secret
    mutate({ ...formData, role: 'admin' }, {
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
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${image3})`,
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
            className="h-[120px] w-[120px] bg-white rounded-full p-4 mx-auto mb-6 object-contain border-4 border-[#ff6f00] shadow-2xl"
          />

          <h2 className="text-[28px] font-extrabold text-white mb-2 tracking-tight drop-shadow">
            Admin Portal 🛡️
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Create an administrator account
          </p>

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-sm">
              Admin registration successful! Please check your email for the OTP code.
            </div>
          )}

          {isError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
              {error.response?.data?.error || "An error occurred during admin signup."}
            </div>
          )}

          <form className="text-left space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-white mb-2 ml-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Admin full name"
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2 ml-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@yummyfood.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Secure password"
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

            <div>
              <label className="block text-sm font-semibold text-white mb-2 ml-1">Admin Secret Key</label>
              <div className="relative">
                <input
                  type={showSecret ? "text" : "password"}
                  name="adminSecret"
                  value={formData.adminSecret}
                  onChange={handleChange}
                  placeholder="Enter secret authorization key"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                >
                  {showSecret ? (
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

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 mt-4 rounded-xl text-white font-bold text-base bg-[#ff6f00] shadow-lg hover:bg-[#e66400] transition disabled:opacity-50"
            >
              {isPending ? "Processing..." : "Register Admin"}
            </button>
          </form>

          <p className="mt-6 text-sm text-white/80">
            Already an admin?{" "}
            <button 
              onClick={() => setView('admin-login')}
              className="text-[#ff6f00] font-bold hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}