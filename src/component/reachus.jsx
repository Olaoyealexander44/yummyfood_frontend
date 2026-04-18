import React, { useState } from "react";
import logo from "../assets/logo.svg";
import api from "../../axios/axios";
import toast from "react-hot-toast";

const ReachUs = ({ setView }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call your OWN backend which uses Nodemailer
      const response = await api.post("/contact/send", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      if (response.status === 200) {
        toast.success(`Thank you ${formData.name}! Your message has been sent successfully.`);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setView('homepage');
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      toast.error(error.response?.data?.error || "Oops! There was a problem sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side - Info Card */}
        <div className="md:w-1/3 bg-[#ff6f00] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12" />
          
          <div className="relative z-10">
            <img src={logo} alt="Logo" className="h-16 w-16 bg-white rounded-2xl p-2 mb-8 shadow-lg" />
            <h2 className="text-3xl font-black mb-4">Reach Us</h2>
            <p className="text-orange-50 opacity-90 leading-relaxed">
              Have a question or feedback? We'd love to hear from you. Send us a message!
            </p>
          </div>

          <div className="relative z-10 space-y-4 mt-8">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium">olaoyealexander44@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-sm font-medium">+234 800 YUMMY</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-2/3 p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Send a Message</h3>
            <button 
              onClick={() => setView('homepage')}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#ff6f00] focus:ring-4 focus:ring-orange-50 outline-none transition"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  placeholder="e.g. 08012345678"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#ff6f00] focus:ring-4 focus:ring-orange-50 outline-none transition"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#ff6f00] focus:ring-4 focus:ring-orange-50 outline-none transition"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Information / Message</label>
              <textarea 
                name="message"
                required
                rows="4"
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#ff6f00] focus:ring-4 focus:ring-orange-50 outline-none transition resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#ff6f00] text-white rounded-2xl font-black text-lg hover:bg-[#e66400] hover:shadow-xl hover:-translate-y-1 transition active:scale-95 shadow-lg shadow-orange-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReachUs;