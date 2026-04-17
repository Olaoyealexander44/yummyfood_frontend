import React from "react";
import logo from "../assets/logo.svg";
import { useAdminPayments } from "../../hook/usehook";
import { useUpdateOrderStatus } from "../../hook/orderhook";
import toast from "react-hot-toast";

const Admindashboard = ({ setView, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [visibleCount, setVisibleCount] = React.useState(10);
  
  const { data: payments, isLoading, isError, error, refetch } = useAdminPayments();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();

  const handleStatusUpdate = (orderId, status) => {
    updateStatus(
      { orderId, status },
      {
        onSuccess: () => {
          toast.success(`Order #${orderId} marked as ${status}`);
          refetch(); // Refresh the dashboard data
        },
        onError: (err) => {
          toast.error(err.response?.data?.error || "Failed to update status");
        }
      }
    );
  };

  const totalSales = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
  const activeOrders = payments?.filter(p => p.status === 'pending').length || 0;

  const filteredPayments = React.useMemo(() => {
    if (!payments) return [];
    
    return payments.filter(payment => {
      const matchesStatus = statusFilter === 'all' || payment.status.toLowerCase() === statusFilter.toLowerCase();
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        payment.full_name?.toLowerCase().includes(searchLower) ||
        payment.email?.toLowerCase().includes(searchLower) ||
        payment.order_id?.toString().toLowerCase().includes(searchLower);
      
      return matchesStatus && matchesSearch;
    });
  }, [payments, statusFilter, searchQuery]);

  const displayedPayments = filteredPayments.slice(0, visibleCount);
  const hasMore = filteredPayments.length > visibleCount;

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col lg:grid lg:grid-cols-[260px_1fr] relative overflow-x-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <span className="font-black text-gray-800 tracking-tight">Admin <span className="text-[#ff6f00]">Panel</span></span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-orange-50 text-[#ff6f00] rounded-xl hover:bg-orange-100 transition shadow-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r flex flex-col p-6 shadow-xl transition-transform duration-300 transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:w-full lg:flex lg:shadow-none
      `}>
        <div className="mb-10 hidden lg:flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-24 w-24 mb-4 object-contain" />
          <h2 className="text-xl font-black text-gray-800">Admin Panel</h2>
        </div>

        <nav className="flex-1 space-y-2 mt-4 lg:mt-0">
          <button className="w-full text-left px-4 py-3.5 rounded-xl bg-orange-50 text-[#ff6f00] font-bold flex items-center gap-3 shadow-sm shadow-orange-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Overview
          </button>
          <button 
            onClick={() => setView('history')}
            className="w-full text-left px-4 py-3.5 rounded-xl text-gray-500 hover:bg-orange-50 hover:text-[#ff6f00] font-medium flex items-center gap-3 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Manage Orders
          </button>
        </nav>

        <div className="space-y-3 pt-6 border-t border-gray-100">
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.reload();
            }}
            className="w-full py-3.5 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>

          <button 
            onClick={() => setView('homepage')}
            className="w-full py-3.5 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Exit to Shop
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="p-4 md:p-6 lg:p-10 overflow-y-auto max-w-full">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 tracking-tight">
              Welcome, <span className="text-[#ff6f00]">{user?.user_metadata?.full_name?.split(' ')[0] || 'Admin'}</span>
            </h1>
            <p className="text-gray-500 font-medium">Here's what's happening at YummyFood today.</p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Sales</p>
            <h3 className="text-2xl font-black text-gray-800">₦{totalSales.toLocaleString()}</h3>
            <span className="text-green-500 text-xs font-bold">Total revenue to date</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Pending Verification</p>
            <h3 className="text-2xl font-black text-gray-800">{activeOrders}</h3>
            <span className="text-orange-500 text-xs font-bold">Payments awaiting review</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Records</p>
            <h3 className="text-2xl font-black text-gray-800">{payments?.length || 0}</h3>
            <span className="text-blue-500 text-xs font-bold">Total payment submissions</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h3 className="text-xl font-bold text-gray-800">Payment Submissions</h3>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-1 md:justify-end">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search name, email, or order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6f00]/20 focus:border-[#ff6f00] transition"
                />
              </div>

              {/* Status Filter */}
              <div className="flex gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100 overflow-x-auto no-scrollbar">
                {['all', 'pending', 'confirmed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setVisibleCount(10);
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap ${
                      statusFilter === status
                        ? 'bg-white text-[#ff6f00] shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <button className="text-sm text-[#ff6f00] font-bold hover:underline whitespace-nowrap">Download CSV</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-20 text-center text-gray-400 font-medium">Loading data...</div>
            ) : isError ? (
              <div className="p-20 text-center text-red-400 font-medium">Error: {error.message}</div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Delivery Address</th>
                    <th className="px-8 py-4">Order ID</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Receipt</th>
                    <th className="px-8 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {displayedPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50/50 transition relative group">
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-800">{payment.full_name}</span>
                          <span className="text-xs text-gray-400">{payment.email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-xs text-gray-600 max-w-[200px] line-clamp-2" title={payment.delivery_address}>
                          {payment.delivery_address || "N/A"}
                        </p>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-gray-600">#{payment.order_id}</td>
                      <td className="px-8 py-5 text-sm font-black text-gray-800">₦{payment.amount.toLocaleString()}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            payment.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                            payment.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                            'bg-yellow-100 text-yellow-600'
                          }`}>
                            {payment.status}
                          </span>
                          
                          {payment.status === 'pending' && (
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleStatusUpdate(payment.order_id, 'confirmed')}
                                disabled={isUpdating}
                                className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:opacity-50"
                                title="Confirm Payment"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(payment.order_id, 'cancelled')}
                                disabled={isUpdating}
                                className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50"
                                title="Cancel Order"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <a 
                            href={payment.receipt_url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-[#ff6f00] hover:text-[#e66400] transition"
                            title="View Receipt"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </a>
                          
                          {/* More Options Icon */}
                          <button className="p-1.5 text-gray-400 hover:bg-white hover:text-gray-600 rounded-lg transition-all opacity-0 group-hover:opacity-100 border border-transparent hover:border-gray-100 shadow-sm" title="More Options">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-xs text-gray-400 font-medium">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {!isLoading && displayedPayments.length === 0 && (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-bold">No results found</p>
                <p className="text-xs text-gray-400">Try adjusting your filters or search terms.</p>
              </div>
            )}

            {hasMore && (
              <div className="p-8 border-t border-gray-50 flex justify-center bg-gray-50/30">
                <button
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  className="flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-[#ff6f00] hover:text-[#ff6f00] transition-all shadow-sm active:scale-95 group"
                >
                  <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  View More Submissions
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admindashboard;