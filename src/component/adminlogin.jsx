import React, { useState } from "react";
import logo from "../assets/logo.svg";
import image2 from "../assets/IMAGE2.jpg";
import { useSignin } from "../../hook/usehook";

export default function AdminLogin({ setView, setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending, isError, error } = useSignin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...formData, role: 'admin' }, {
      onSuccess: (data) => {
        // Ensure the user being set has admin privileges
        setUser(data.user);
        setView('homepage'); // Or an admin dashboard if available
      },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${image2})`,
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
            Admin Login 🛡️
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Access the management dashboard
          </p>

          {isError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
              {error.response?.data?.error || "Invalid admin credentials."}
            </div>
          )}

          <form className="text-left space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-white mb-2 ml-1">Admin Email</label>
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
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 mt-4 rounded-xl text-white font-bold text-base bg-[#ff6f00] shadow-lg hover:bg-[#e66400] transition disabled:opacity-50"
            >
              {isPending ? "Authenticating..." : "Login to Admin"}
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-3">
            <p className="text-sm text-white/80">
              Need to register a new admin?{" "}
              <button 
                onClick={() => setView('admin-signup')}
                className="text-[#ff6f00] font-bold hover:underline"
              >
                Sign up here
              </button>
            </p>
            <button 
              onClick={() => setView('signin')}
              className="text-white/60 text-xs hover:text-white transition"
            >
              Switch to Customer Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}