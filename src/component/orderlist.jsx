import React from "react";
import toast from "react-hot-toast";

const OrderList = ({ setView, user, orders, onDeleteOrder, onAddToOrder, setFinalOrder }) => {
  const subtotal = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = orders.reduce((sum, item) => sum + item.quantity, 0);

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      // Create a simplified version of the item with decreased quantity for the handler
      // Or just pass a minus signal if we had a more complex handler.
      // For now, we'll just implement the logic here via the props we have.
      // Since App.jsx's handleAddToOrder only adds, we need a way to subtract.
      // I'll update App.jsx to handle this better in a moment, 
      // but for now I'll just use onDeleteOrder if it's 1, or assume a new handler.
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-800">Your Order</h2>
            <p className="text-gray-500">You have {totalItems} items selected</p>
          </div>
          <button 
            onClick={() => setView('homepage')}
            className="p-2 bg-white rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your list is empty</h3>
            <p className="text-gray-500 mb-6">Go back to the menu to select some tasty food!</p>
            <button 
              onClick={() => setView('homepage')}
              className="bg-[#ff6f00] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#e66400] transition"
            >
              Back to Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 space-y-6">
                {orders.map((item) => (
                  <div key={item.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                        />
                        <span className="absolute -top-2 -right-2 bg-[#ff6f00] text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white shadow-md">
                          x{item.quantity}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-400">Unit: ₦{item.price.toLocaleString()}</p>
                        
                        <div className="flex items-center gap-3 mt-2">
                          <button 
                            onClick={() => onDeleteOrder(item.id)}
                            className="p-1 bg-gray-100 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                            <span className="text-xs font-bold text-gray-600">Qty: {item.quantity}</span>
                            <button 
                              onClick={() => onAddToOrder(item)}
                              className="text-[#ff6f00] hover:bg-orange-50 rounded p-0.5 transition"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-800 text-lg">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Section */}
              <div className="bg-gray-50 p-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-black text-gray-800">₦{subtotal.toLocaleString()}</span>
                </div>
                
                <button 
                  onClick={() => {
                    if (!user) {
                      toast("Please sign in to complete your order.", {
                        icon: '🔒',
                      });
                      setView('signin');
                      return;
                    }
                    setFinalOrder(orders, subtotal);
                  }}
                  className="w-full py-4 bg-[#ff6f00] text-white rounded-2xl font-bold text-lg hover:bg-[#e66400] hover:shadow-lg hover:-translate-y-1 transition active:scale-95 shadow-xl shadow-orange-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => setView('homepage')}
              className="w-full py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition"
            >
              Add More Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;