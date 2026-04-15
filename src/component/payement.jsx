import React from "react";

const PaymentPage = ({ setView }) => {
  const confirmPayment = () => {
    alert("After payment, send proof via WhatsApp");
  };

  const contactLogistics = () => {
    window.open("https://wa.me/2348169142969", "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[400px] p-8 rounded-2xl shadow-lg text-center">
        
        <h2 className="text-2xl font-semibold mb-2">
          Payment & Delivery
        </h2>
        <p className="text-gray-500 mb-5">
          Choose how you'd like to complete your order
        </p>

        {/* Bank Details */}
        <div className="bg-orange-50 p-4 rounded-lg mb-5 text-left">
          <p className="font-semibold">OPAY</p>
          <p className="font-semibold">Account Name: YummyFood Ventures</p>
          <p className="font-semibold">Account Number: 0123456789</p>
        </div>

        {/* Payment Button */}
        <button
          onClick={() => setView('ihavemadepayment')}
          className="w-full py-3 mt-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
        >
          I Have Made Payment
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={contactLogistics}
          className="w-full py-3 mt-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
        >
          Contact Logistics (WhatsApp)
        </button>

        {/* Back Button */}
        <button
          onClick={() => setView('homepage')}
          className="w-full py-3 mt-3 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition"
        >
          Back to Home
        </button>

        {/* Note */}
        <p className="text-sm text-gray-400 mt-4">
          After payment, kindly send your receipt and delivery details via WhatsApp.
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;