import React from "react";
import logo from "../assets/logo.svg";
import image2 from "../assets/IMAGE2.jpg";

export default function SignIn({ setView }) {
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

          <form className="text-left">
            <div className="mb-5">
              <label className="block text-sm font-semibold text-white mb-2 ml-1">
                Email
              </label>
              <input
                type="email"
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
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/50 focus:bg-white/20 focus:border-[#ff6f00] focus:shadow-[0_0_0_4px_rgba(255,111,0,0.2)] focus:-translate-y-0.5 outline-none transition"
              />
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setView('homepage');
              }}
              className="w-full py-4 mt-3 rounded-xl text-white font-bold text-base bg-gradient-to-br from-[#ff6f00] to-[#ff8c42] shadow-lg hover:-translate-y-1 hover:shadow-xl hover:bg-[#e66400] transition"
            >
              Login
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
        </div>
      </div>
    </div>
  );
}
