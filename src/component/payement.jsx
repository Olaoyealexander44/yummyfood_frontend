import React, { useEffect, useState } from "react";

const terms = [
  "All payments made to YummyFood Ventures are final once an order has been confirmed.",
  "Customers are responsible for providing accurate delivery details and contact information.",
  "Orders will only be processed after payment confirmation and receipt verification.",
  "Delivery timelines may vary depending on location, traffic, weather conditions, or logistics availability.",
  "Customers must inspect their orders upon delivery and report any issues immediately.",
  "YummyFood Ventures reserves the right to cancel or decline suspicious or fraudulent orders.",
  "By making payment, you agree to these terms and conditions.",
];

const PaymentPage = ({ setView }) => {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    setShowTerms(true);
  }, []);

  const contactLogistics = () => {
    window.open("https://wa.me/2348169142969", "_blank");
  };

  const handleAccept = () => {
    setHasAcceptedTerms(true);
    setShowTerms(false);
  };

  const handleDecline = () => {
    setHasAcceptedTerms(false);
    setShowTerms(false);
    setView('homepage');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {showTerms && !hasAcceptedTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-black text-gray-800">Terms &amp; Conditions</h2>
              <p className="text-sm text-gray-500 mt-1">You must accept before continuing to payment.</p>
            </div>

            <div className="p-6 max-h-[55vh] overflow-y-auto">
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                {terms.map((t) => (
                  <li key={t} className="text-sm leading-6">{t}</li>
                ))}
              </ul>
            </div>

            <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={handleDecline}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#ff6f00] text-white font-bold hover:bg-[#e66400] transition"
              >
                I Accept
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white w-[400px] p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Payment & Delivery
        </h2>
        <p className="text-gray-500 mb-5">
          Choose how you'd like to complete your order
        </p>

        <div className="bg-orange-50 p-4 rounded-lg mb-5 text-left">
          <p className="font-semibold">OPAY</p>
          <p className="font-semibold">Account Name: Olaoye Alexander Oluwayanmife</p>
          <p className="font-semibold">Account Number: 8169142969</p>
        </div>

        <button
          onClick={() => setView('ihavemadepayment')}
          disabled={!hasAcceptedTerms}
          className="w-full py-3 mt-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          I Have Made Payment
        </button>

        <button
          onClick={contactLogistics}
          disabled={!hasAcceptedTerms}
          className="w-full py-3 mt-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Contact Logistics (WhatsApp)
        </button>

        <button
          onClick={() => setView('homepage')}
          className="w-full py-3 mt-3 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition"
        >
          Back to Home
        </button>

        <p className="text-sm text-gray-400 mt-4">
          After payment, kindly send your receipt and delivery details via WhatsApp.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Ensure you fill the form properly after making payment or reach out to us @ 08169142969 for any issues or clarifications.
        </p>

        {!hasAcceptedTerms && (
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="mt-4 text-xs font-bold text-[#ff6f00] hover:underline"
          >
            View Terms &amp; Conditions
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;