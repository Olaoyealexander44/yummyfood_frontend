import React, { useState } from "react";

const Settings = ({ setView, user, setUser }) => {
  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 text-center max-w-sm">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#ff6f00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Login Required</h3>
          <p className="text-gray-500 text-sm mb-8">Please sign in to access your account settings and preferences.</p>
          <button 
            onClick={() => setView('signin')}
            className="w-full py-4 bg-[#ff6f00] text-white rounded-2xl font-bold hover:bg-[#e66400] transition shadow-lg active:scale-95"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || user?.full_name || "",
    email: user?.email || "",
    notifications: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state (in a real app, this would be a Supabase update call)
      const updatedUser = {
        ...user,
        user_metadata: { ...user?.user_metadata, full_name: formData.fullName },
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">Settings</h2>
            <p className="text-sm text-gray-500">Manage your account and preferences</p>
          </div>
          <button 
            onClick={() => setView('homepage')}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            Back
          </button>
        </div>

        <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-100">
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${
              message.type === "success" ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Profile Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-50 text-[#ff6f00] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ff6f00] outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-200 text-gray-500 cursor-not-allowed outline-none"
                  />
                  <p className="text-[10px] text-gray-400 mt-1 ml-1">Email cannot be changed for security reasons.</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-50" />

            {/* Preferences Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-50 text-[#ff6f00] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </span>
                Preferences
              </h3>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-bold text-gray-800 text-sm">Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive order updates and tasty offers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6f00]"></div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-4 bg-[#ff6f00] text-white rounded-2xl font-bold text-base hover:bg-[#e66400] transition shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isSaving ? "Saving Changes..." : "Save Settings"}
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
                setView('homepage');
              }}
              className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold text-base hover:bg-red-100 transition active:scale-95 mt-4"
            >
              Logout from Device
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;