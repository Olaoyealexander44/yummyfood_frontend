import React from "react";
import { useOrderHistory, useAllOrders } from "../../hook/orderhook";

const HistoryOrder = ({ setView, user }) => {
  // Check role in both user_metadata (from Supabase) and root user object (from our backend)
  const isAdmin = user?.user_metadata?.role === 'admin' || user?.role === 'admin';
  
  // Fetch user-specific history or all history if admin
  const { data: userHistory, isLoading: loadingUser } = useOrderHistory({ enabled: !!user && !isAdmin });
  const { data: allHistory, isLoading: loadingAll } = useAllOrders({ enabled: isAdmin });

  const history = isAdmin ? (allHistory || []) : (userHistory || []);
  const isLoading = isAdmin ? loadingAll : loadingUser;

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-3 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
              {isAdmin ? "Global Order History" : "My Order History"}
            </h2>
            <p className="text-sm text-gray-500">
              {isAdmin ? "Viewing all user orders across the platform" : "Track and manage your previous orders"}
            </p>
          </div>
          <button 
            onClick={() => setView('homepage')}
            className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm active:scale-95"
          >
            Back to Shop
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6f00]"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 md:p-16 text-center border border-dashed border-gray-300">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">No orders found</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
              {isAdmin ? "There are currently no orders in the system." : "You haven't placed any orders. Start shopping today!"}
            </p>
            {!isAdmin && (
              <button 
                onClick={() => setView('homepage')}
                className="w-full sm:w-auto bg-[#ff6f00] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#e66400] transition active:scale-95"
              >
                Order Something Tasty
              </button>
            )}
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
                      <p className="text-xs md:text-sm font-semibold text-gray-500">
                        {new Date(order.created_at || order.date).toLocaleString()}
                      </p>
                      {isAdmin && order.user_id && (
                        <p className="text-[10px] text-[#ff6f00] font-bold mt-1 uppercase">User ID: {order.user_id.slice(0, 8)}...</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between lg:justify-end gap-4 md:gap-6">
                    {order.receipt_url && (
                      <a 
                        href={order.receipt_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] md:text-xs font-bold text-[#ff6f00] hover:underline flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-lg"
                      >
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Receipt
                      </a>
                    )}
                    <div className="lg:text-right">
                      <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase mb-0.5">Total Amount</p>
                      <p className="text-lg md:text-xl font-black text-gray-800">₦{(order.total_amount || order.total || 0).toLocaleString()}</p>
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
                  {(order.items || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 md:p-3 bg-gray-50 rounded-xl md:rounded-2xl border border-transparent hover:border-orange-100 transition">
                      <img src={item.img} alt="" className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl object-cover shadow-sm" />
                      <div className="min-w-0">
                        <p className="text-xs md:text-sm font-bold text-gray-800 truncate">{item.name}</p>
                        <p className="text-[10px] md:text-xs text-gray-500">Qty: {item.quantity} • ₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {order.status === 'pending' && !isAdmin && (
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