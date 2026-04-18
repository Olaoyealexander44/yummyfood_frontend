import React from "react";
import { useOrderHistory, useAllOrders, useUpdateOrderStatus, useTrackOrder } from "../../hook/orderhook";
import toast from "react-hot-toast";

const HistoryOrder = ({ setView, user }) => {
  const [filter, setFilter] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visibleCount, setVisibleCount] = React.useState(5);
  
  // Guest tracking state
  const [trackId, setTrackId] = React.useState('');
  const [trackEmail, setTrackEmail] = React.useState('');
  const [trackedOrder, setTrackedOrder] = React.useState(null);

  // Check role in both user_metadata (from Supabase) and root user object (from our backend)
  const isAdmin = user?.user_metadata?.role === 'admin' || user?.role === 'admin';
  
  // Fetch user-specific history or all history if admin
  const { data: userHistory, isLoading: loadingUser } = useOrderHistory({ enabled: !!user && !isAdmin });
  const { data: allHistory, isLoading: loadingAll } = useAllOrders({ enabled: isAdmin });
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();
  const { mutate: trackGuestOrder, isPending: isTracking } = useTrackOrder();

  const rawHistory = isAdmin ? (allHistory || []) : (userHistory || []);
  const isLoading = isAdmin ? loadingAll : (user ? loadingUser : false);

  // If a guest has tracked an order, we show only that one
  const displayHistory = trackedOrder ? [trackedOrder] : rawHistory;

  const filteredByStatus = filter === 'all' 
    ? displayHistory 
    : displayHistory.filter(order => {
        const status = order.status.toLowerCase();
        if (filter === 'pending') {
          return status === 'pending' || status === 'awaiting_confirmation';
        }
        return status === filter.toLowerCase();
      });

  const searchedHistory = searchQuery.trim() === ''
    ? filteredByStatus
    : filteredByStatus.filter(order => 
        order.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items?.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const history = searchedHistory.slice(0, visibleCount);
  const hasMore = searchedHistory.length > visibleCount;

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackId || !trackEmail) {
      toast.error("Please enter both Order ID and Email");
      return;
    }

    trackGuestOrder(
      { orderId: trackId, email: trackEmail },
      {
        onSuccess: (order) => {
          setTrackedOrder(order);
          toast.success("Order found!");
        },
        onError: (error) => {
          toast.error(error.response?.data?.error || "Order not found or email mismatch");
        }
      }
    );
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    updateStatus(
      { orderId, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`Order has been ${newStatus} successfully!`);
        },
        onError: (error) => {
          toast.error(error.response?.data?.error || "Failed to update order status.");
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-3 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
              {isAdmin ? "Global Order History" : user ? "My Order History" : "Track Your Order"}
            </h2>
            <p className="text-sm text-gray-500">
              {isAdmin ? "Viewing all user orders across the platform" : user ? "Track and manage your previous orders" : "Enter your details to check order status"}
            </p>
          </div>
          <button 
            onClick={() => setView('homepage')}
            className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm active:scale-95"
          >
            Back to Shop
          </button>
        </div>

        {/* Support Contact Banner */}
        {!isAdmin && (
          <div className="mb-6 p-4 bg-gradient-to-r from-[#fff8f4] to-[#fff4ee] border border-orange-100 rounded-2xl flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 bg-[#ff6f00] rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Need help with your order?</p>
              <p className="text-xs text-gray-500">
                In case of any complaint or delay in confirmation, kindly reach out via call or WhatsApp at{" "}
                <a href="https://wa.me/2348169142969" target="_blank" rel="noopener noreferrer" className="text-[#ff6f00] font-bold hover:underline">08169142969</a>
              </p>
            </div>
          </div>
        )}

        {/* Guest Tracking Form */}
        {!user && !trackedOrder && (
          <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm mb-8">
            <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Order ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. 1713456789"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6f00]/20 transition"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="The email used for the order"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6f00]/20 transition"
                  value={trackEmail}
                  onChange={(e) => setTrackEmail(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                disabled={isTracking}
                className="w-full md:w-auto px-8 py-3.5 bg-[#ff6f00] text-white rounded-2xl font-bold hover:bg-[#e66400] transition shadow-lg shadow-orange-100 active:scale-95 disabled:opacity-50"
              >
                {isTracking ? "Searching..." : "Track Order"}
              </button>
            </form>
          </div>
        )}

        {/* Search and Filter Section (Only if user is logged in or an order is tracked) */}
        {(user || trackedOrder) && (
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by Order ID or item name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6f00]/20 focus:border-[#ff6f00] transition shadow-sm"
              />
            </div>
            
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
              {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilter(status);
                    setVisibleCount(5); // Reset count on filter change
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-bold capitalize transition-all whitespace-nowrap ${
                    filter === status
                      ? 'bg-[#ff6f00] text-white shadow-md'
                      : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {status}
                </button>
              ))}

              {hasMore && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 5)}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm active:scale-95 group"
                  >
                    <svg className="w-5 h-5 text-[#ff6f00] group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    View More Orders
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

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
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
              {searchQuery ? "No matching orders" : (filter === 'all' ? "No orders found" : `No ${filter} orders`)}
            </h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
              {searchQuery 
                ? `No orders found matching "${searchQuery}". Try a different search term.`
                : (filter === 'all' 
                  ? (isAdmin ? "There are currently no orders in the system." : user ? "You haven't placed any orders. Start shopping today!" : "No order found with those details.")
                  : `You don't have any orders with status "${filter}" at the moment.`)}
            </p>
            {trackedOrder && (
              <button 
                onClick={() => {
                  setTrackedOrder(null);
                  setTrackId('');
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition active:scale-95"
              >
                Clear Results
              </button>
            )}
            {!isAdmin && !trackedOrder && (
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
                      {order.delivery_address && (
                        <div className="flex items-center gap-1.5 mt-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 max-w-xs">
                          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="text-[10px] text-gray-500 font-medium truncate" title={order.delivery_address}>
                            {order.delivery_address}
                          </p>
                        </div>
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
                        : order.status === 'cancelled'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {order.status === 'awaiting_confirmation' ? 'pending' : order.status}
                    </div>
                    
                    {/* View More Options Icon */}
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors" title="Order options">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>

                    {isAdmin && order.status !== 'cancelled' && (
                      <div className="flex gap-2">
                        {order.status !== 'confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                            disabled={isUpdating}
                            className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-[10px] md:text-xs font-bold hover:bg-green-600 transition disabled:opacity-50"
                          >
                            Confirm
                          </button>
                        )}
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                          disabled={isUpdating}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-[10px] md:text-xs font-bold hover:bg-red-600 transition disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
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