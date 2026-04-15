import React, { useState } from "react";

const IHaveMadePayment = ({ setView, orders, total, orderId, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    receipt: null,
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, receipt: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Confirm the order in history
    if (onConfirm && orderId) {
      onConfirm(orderId);
    }
    
    alert(`Thank you ${formData.name}! Your proof of payment for ₦${total.toLocaleString()} has been submitted. We will process your order and send a confirmation to ${formData.email}.`);
    setView('history');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb] p-6">
      <div className="bg-white w-full max-w-2xl p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Confirm Your Payment</h2>
        <p className="text-gray-500 text-center mb-8">Please provide your details and upload your payment receipt.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h3>
            <div className="space-y-3 max-h-[200px] overflow-y-auto mb-4 pr-2">
              {orders.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} (x{item.quantity})</span>
                  <span className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Total Paid</span>
              <span className="text-xl font-black text-[#ff6f00]">₦{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Submission Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff6f00] outline-none transition"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff6f00] outline-none transition"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Upload Receipt</label>
              <div className="relative group">
                <input 
                  type="file" 
                  accept="image/*,.pdf"
                  required
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 group-hover:border-[#ff6f00] bg-gray-50 text-sm transition cursor-pointer"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 ml-1">* JPG, PNG or PDF formats only</p>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[#ff6f00] text-white rounded-xl font-bold text-lg hover:bg-[#e66400] hover:shadow-lg hover:-translate-y-0.5 transition active:scale-95 mt-2"
            >
              Submit Proof of Payment
            </button>
            
            <button 
              type="button"
              onClick={() => setView('payement')}
              className="w-full py-2 text-gray-400 text-sm font-medium hover:text-gray-600 transition"
            >
              Back to Bank Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IHaveMadePayment;