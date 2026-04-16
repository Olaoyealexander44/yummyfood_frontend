import React, { useState } from "react";
import logo from "../assets/logo.svg";
import image2 from "../assets/IMAGE2.jpg";
import { useSignin } from "../../hook/usehook";

export default function SignIn({ setView, setUser }) {
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
    mutate(formData, {
      onSuccess: (data) => {
        setUser(data.user);
        setView('homepage');
      },
    });
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
        <div className="absolute -inset-5 rounded-3xl blur-2xl bg-[radial-gradient(circle,rgba(255,111,0,0.2),transparent_70%)] -z-10" />

        <div className="bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[30px] px-10 py-12 text-center">
          <img
            src={logo}
            alt="YummyFood Logo"
            className="h-[150px] w-[150px] bg-white rounded-full p-4 mx-auto mb-8 object-contain border-4 border-[rgba(255,111,0,0.8)] shadow-2xl hover:scale-110 hover:rotate-6 transition"
          />

          <h2 className="text-[25px] font-extrabold text-white mb-5 tracking-tight drop-shadow">
            Welcome Back 👋
          </h2>

          {isError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
              {error.response?.data?.error || "Invalid email or password."}
            </div>
          )}

          <form className="text-left" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] focus:shadow-[0_0_0_4px_rgba(255,111,0,0.2)] focus:-translate-y-0.5 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 mt-3 rounded-xl text-white font-bold text-base bg-gradient-to-br from-[#ff6f00] to-[#ff8c42] shadow-lg hover:-translate-y-1 hover:shadow-xl hover:bg-[#e66400] transition disabled:opacity-50"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm text-white/80">
            Don't have an account?{" "}
            <button 
              onClick={() => setView('signup')}
              className="text-[#ff6f00] font-bold"
            >
              Sign up
            </button>
          </p>

          <button 
            onClick={() => setView('admin-login')}
            className="mt-6 text-xs text-white/50 hover:text-white transition uppercase tracking-widest font-bold"
          >
            Admin Portal 🛡️
          </button>
        </div>
      </div>
    </div>
  );
}
