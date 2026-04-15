import React, { useState } from "react";
import logo from "../assets/logo.svg";
import image1 from "../assets/IMAGE1.jpg";
import image2 from "../assets/IMAGE2.jpg";
import image3 from "../assets/IMAGE3.jpg";

export default function Homepage({ setView, orders, onAddToOrder, onDeleteOrder, setFinalOrder }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // New state to track if user is registered

  const subtotal = orders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = isRegistered ? subtotal * 0.05 : 0; // Only calculate discount if registered
  const total = subtotal - discount;

  const menuItems = [
    "Order List",
    "Reach Us",
    "Order History",
    "Settings",
  ];

  return (
    <div className="bg-[#f8f9fb] min-h-screen lg:h-screen flex flex-col lg:grid lg:grid-cols-[220px_1fr_300px] relative">
      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-40">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <div className="flex items-center gap-2">
          {orders.length > 0 && (
            <button 
              onClick={() => setView('orderlist')}
              className="relative p-2 bg-orange-50 rounded-full text-[#ff6f00]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#ff6f00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {orders.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </button>
          )}
          <img 
            src={logo} 
            alt="Logo" 
            className="h-10 w-10 object-contain bg-white rounded-full p-1 shadow-sm border border-gray-100" 
          />
        </div>
      </div>

      {/* Mobile Slide-out Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar - Shared logic for Mobile and Desktop */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white px-5 pt-2 pb-6 border-r flex flex-col transition-transform duration-300 transform
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:w-full lg:flex
      `}>
        <div className="flex justify-between items-center lg:block">
          <h2 className="-mt-8 -mb-2 flex items-center">
            <img
              src={logo}
              alt="YummyFood Logo"
              className="h-[180px] object-contain hover:scale-105 transition"
            />
          </h2>
          <button 
            className="lg:hidden p-2 text-gray-500"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="mt-5 space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                if (item === "Order History") setView('history');
                else if (item === "Order List") setView('orderlist');
                else if (item === "Reach Us") setView('reachus');
              }}
              className={`px-4 py-3 rounded-xl flex items-center gap-3 text-[15px] font-medium cursor-pointer transition-all duration-300 ${
                (item === "Order List" && false) || (item === "Order History" && false)
                  ? "bg-[#ff6f00] text-white font-semibold shadow-md"
                  : "text-gray-500 hover:bg-[#fdf2e9] hover:text-[#ff6f00] hover:translate-x-1"
              }`}
            >
              {item}
            </li>
          ))}
          {/* Mobile-only links */}
          <li className="lg:hidden pt-4 mt-4 border-t border-gray-100">
            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Account</p>
            <div className="px-4 py-3 rounded-xl text-gray-500 hover:bg-[#fdf2e9] hover:text-[#ff6f00] cursor-pointer transition">
              Sign In
            </div>
            <div className="px-4 py-3 rounded-xl text-gray-500 hover:bg-[#fdf2e9] hover:text-[#ff6f00] cursor-pointer transition">
              Sign Up
            </div>
          </li>
        </ul>

        <button className="mt-auto w-full p-4 rounded-xl text-white font-bold text-sm bg-gradient-to-br from-gray-800 to-black relative overflow-hidden hover:-translate-y-1 hover:shadow-lg transition">
          Upgrade
          <span className="absolute -top-2 -right-2 bg-[#ff6f00] text-[10px] px-3 pt-3 pb-1 rotate-45">
            PRO
          </span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 py-2">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              Hello, welcome to <span className="text-[#ff6f00]">YummyFood</span> 
              <img src={logo} alt="" className="h-6 w-6 md:h-18 md:w-18 object-contain" />
            </h3>
            <p className="text-gray-400 text-sm">
              Your favorite meals are just a click away!
            </p>
          </div>
        </header>

        {/* Banner */}
        <section
          className="rounded-2xl text-white mb-8 flex items-center min-h-[160px] md:min-h-[200px] p-6 md:p-10"
          style={{
            backgroundImage:
              `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl mb-4 font-bold">
              Get your tasty YummyFood today!
            </h2>
            <p className="mb-5 opacity-95 text-sm md:text-base">
              Fresh, healthy, and delivered to your doorstep.
            </p>
            <button className="bg-[#ff6f00] px-6 py-2 md:py-3 rounded-lg font-bold hover:scale-105 hover:bg-[#e66400] transition text-sm md:text-base">
              Order Now
            </button>
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h4 className="text-lg md:text-xl text-gray-800 font-bold">Order List</h4>
            <span className="text-xs text-gray-400">Click to add to order</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Dry Fish", price: 8000, img: image2 },
              { name: "Native Crayfish", price: 7500, img: image3 },
              { name: "White Native", price: 15000, img: image3 },
              { name: "Shrimp", price: 12000, img: image3 },
            ].map((item, i) => {
              const orderItem = orders.find(o => o.name === item.name);
              const isSelected = !!orderItem;
              
              return (
                <div
                  key={i}
                  onClick={() => onAddToOrder(item)}
                  className={`bg-white p-4 md:p-5 rounded-2xl text-center border transition cursor-pointer group relative ${
                    isSelected ? 'border-[#ff6f00] shadow-md ring-1 ring-[#ff6f00]/20' : 'border-gray-100 hover:-translate-y-1 hover:shadow-lg hover:border-[#ffe0cc]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 bg-[#ff6f00] text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-lg z-10 animate-bounce-short">
                      {orderItem.quantity}
                    </div>
                  )}
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={item.img}
                      alt=""
                      className="w-full h-[120px] md:h-[140px] object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#ff6f00] text-white p-2 rounded-full shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <h5 className="text-gray-800 font-semibold mb-1">{item.name}</h5>
                  <p className="text-[#ff6f00] font-bold text-lg">₦{item.price.toLocaleString()}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Rightbar - Hidden on mobile/tablet, visible on large screens */}
      <aside className="hidden xl:flex bg-white px-6 pt-16 pb-6 border-l flex-col gap-8 overflow-y-auto">
        <div className="bg-gradient-to-br from-[#ff6f00] to-[#ff8c42] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute -top-5 -right-5 w-24 h-24 bg-white/10 rounded-full" />
          <h4 className="uppercase text-lg mb-2 opacity-90">Order Menu</h4>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <a href="#" className="text-xs text-[#ff6f00] font-semibold">
              View All
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {orders.map((item) => (
              <div
                key={item.id}
                className="group flex justify-between items-center p-3 bg-[#fcfcfc] rounded-xl border border-gray-100 hover:translate-x-1 hover:bg-white hover:border-[#ffe0cc] transition relative"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.img}
                    alt=""
                    className="w-11 h-11 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm">₦{(item.price * item.quantity).toLocaleString()}</span>
                  <button 
                    onClick={() => onDeleteOrder(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete item"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                Your cart is empty
              </div>
            )}
          </div>

          <div className="mt-2 pt-4 border-t border-dashed flex flex-col gap-2">
            <div className="flex flex-col text-sm text-gray-400">
              {isRegistered ? (
                <div className="flex justify-between">
                  <span>Discount (5%)</span>
                  <span className="text-green-500">-₦{discount.toLocaleString()}</span>
                </div>
              ) : (
                <div className="bg-[#fff8f4] p-3 rounded-xl border border-[#ffe0cc]">
                  <p className="text-[11px] text-[#ff6f00] font-semibold text-center leading-tight">
                    Get 5% discount on all orders! 
                    <br />
                    <button 
                      onClick={() => setIsRegistered(true)} 
                      className="underline font-bold hover:text-[#e66400] mt-1"
                    >
                      Sign up / Login now
                    </button>
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-between text-lg font-extrabold text-gray-800 mt-2">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={() => {
              setFinalOrder(orders, total);
              setView('payement');
            }}
            className="w-full p-4 bg-[#ff6f00] text-white rounded-2xl font-bold text-base hover:-translate-y-1 hover:bg-[#e66400] hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={orders.length === 0}
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}
