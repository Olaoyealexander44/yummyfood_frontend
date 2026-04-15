import React from "react";

const HistoryOrder = ({ setView, history }) => {
  return (
    <div className="min-h-screen bg-[#f8f9fb] p-3 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">Order History</h2>
            <p className="text-sm text-gray-500">Track and manage your previous orders</p>
          </div>
          <button 
            onClick={() => setView('homepage')}
            className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm active:scale-95"
          >
            Back to Shop
          </button>
        </div>

        {history.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 md:p-16 text-center border border-dashed border-gray-300">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">No orders yet</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">You haven't placed any orders. Start shopping today!</p>
            <button 
              onClick={() => setView('homepage')}
              className="w-full sm:w-auto bg-[#ff6f00] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#e66400] transition active:scale-95"
            >
              Order Something Tasty
            </button>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {history.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-50">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2.5 md:p-3 bg-orange-50 rounded-xl md:rounded-2xl text-[#ff6f00]">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID: #{order.id.toString().slice(-6)}</p>
                      <p className="text-xs md:text-sm font-semibold text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between lg:justify-end gap-4 md:gap-6">
                    <div className="lg:text-right">
                      <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase mb-0.5">Total Amount</p>
                      <p className="text-lg md:text-xl font-black text-gray-800">₦{order.total.toLocaleString()}</p>
                    </div>
                    <div className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest ${
                      order.status === 'confirmed' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 md:p-3 bg-gray-50 rounded-xl md:rounded-2xl border border-transparent hover:border-orange-100 transition">
                      <img src={item.img} alt="" className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl object-cover shadow-sm" />
                      <div className="min-w-0">
                        <p className="text-xs md:text-sm font-bold text-gray-800 truncate">{item.name}</p>
                        <p className="text-[10px] md:text-xs text-gray-500">Qty: {item.quantity} • ₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {order.status === 'pending' && (
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-50 flex justify-end">
                    <button 
                      onClick={() => setView('payement')}
                      className="text-xs md:text-sm font-bold text-[#ff6f00] hover:text-[#e66400] transition flex items-center gap-1.5 group"
                    >
                      Complete Payment 
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryOrder;