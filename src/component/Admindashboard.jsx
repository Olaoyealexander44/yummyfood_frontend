import React from "react";
import logo from "../assets/logo.svg";
import { useAdminPayments } from "../../hook/usehook";

const Admindashboard = ({ setView, user }) => {
  const { data: payments, isLoading, isError, error } = useAdminPayments();

  const totalSales = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
  const activeOrders = payments?.filter(p => p.status === 'pending').length || 0;

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col lg:grid lg:grid-cols-[260px_1fr] relative">
      {/* Sidebar */}
      <aside className="bg-white border-r flex flex-col p-6 shadow-sm">
        <div className="mb-10 flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-24 w-24 mb-4 object-contain" />
          <h2 className="text-xl font-black text-gray-800">Admin Panel</h2>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-orange-50 text-[#ff6f00] font-bold flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Overview
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-800 font-medium flex items-center gap-3 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Manage Orders
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-800 font-medium flex items-center gap-3 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Menu Items
          </button>
        </nav>

        <button 
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
          }}
          className="mt-4 w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>

        <button 
          onClick={() => setView('homepage')}
          className="mt-4 w-full py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Exit to Shop
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-800">Welcome, {user?.user_metadata?.full_name || 'Admin'}</h1>
            <p className="text-gray-500">Here's what's happening at YummyFood today.</p>
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
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Payment Submissions</h3>
            <button className="text-sm text-[#ff6f00] font-bold hover:underline">Download CSV</button>
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
                    <th className="px-8 py-4">Order ID</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Receipt</th>
                    <th className="px-8 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {payments?.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-800">{payment.full_name}</span>
                          <span className="text-xs text-gray-400">{payment.email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-gray-600">#{payment.order_id}</td>
                      <td className="px-8 py-5 text-sm font-black text-gray-800">₦{payment.amount.toLocaleString()}</td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          payment.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <a 
                          href={payment.receipt_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[#ff6f00] hover:text-[#e66400] transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </a>
                      </td>
                      <td className="px-8 py-5 text-xs text-gray-400 font-medium">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admindashboard;