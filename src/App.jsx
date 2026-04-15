import React, { useState } from 'react'
import './index.css'
import Homepage from './component/homepage'
import SignIn from './component/signIn'
import Signup from './component/signup'   
import PaymentPage from './component/payement'
import IHaveMadePayment from './component/ihavemadepayment'
import HistoryOrder from './component/historyorder'
import OrderList from './component/orderlist'
import ReachUs from './component/reachus'

function App() {
  const [view, setView] = useState('homepage')
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0)
  const [orderHistory, setOrderHistory] = useState([])
  const [activeOrderId, setActiveOrderId] = useState(null)

  const handleAddToOrder = (item) => {
    setOrders(prevOrders => {
      const existingItem = prevOrders.find(order => order.name === item.name);
      if (existingItem) {
        return prevOrders.map(order => 
          order.name === item.name 
            ? { ...order, quantity: order.quantity + 1 } 
            : order
        );
      }
      return [...prevOrders, { ...item, id: Date.now(), quantity: 1 }];
    });
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleCheckout = (orders, total) => {
    const newOrderId = Date.now();
    const newOrder = {
      id: newOrderId,
      items: orders,
      total: total,
      status: 'pending',
      date: new Date().toLocaleString()
    };
    setOrderHistory([newOrder, ...orderHistory]);
    setActiveOrderId(newOrderId);
    setTotalAmount(total);
    setView('payement');
  };

  const confirmOrderPayment = (orderId) => {
    setOrderHistory(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'confirmed' } : order
    ));
  };

  return (
    <div className="relative">
      <nav className="hidden lg:flex fixed top-4 right-4 z-50 gap-2">
        <button 
          onClick={() => setView('homepage')}
          className={`px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition ${view === 'homepage' ? 'bg-[#ff6f00] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          Home
        </button>
        <button 
          onClick={() => setView('history')}
          className={`px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition ${view === 'history' ? 'bg-[#ff6f00] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          History
        </button>
        <button 
          onClick={() => setView('signin')}
          className={`px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition ${view === 'signin' ? 'bg-[#ff6f00] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          Sign In
        </button>
      </nav>

      {view === 'homepage' && (
        <Homepage 
          setView={setView} 
          orders={orders}
          onAddToOrder={handleAddToOrder}
          onDeleteOrder={handleDeleteOrder}
          setFinalOrder={handleCheckout} 
        />
      )}
      {view === 'signin' && <SignIn setView={setView} />}
      {view === 'signup' && <Signup setView={setView} />}
      {view === 'payement' && <PaymentPage setView={setView} />}
      {view === 'ihavemadepayment' && (
        <IHaveMadePayment 
          setView={setView} 
          orders={orders} 
          total={totalAmount} 
          orderId={activeOrderId}
          onConfirm={confirmOrderPayment}
        />
      )}
      {view === 'history' && (
        <HistoryOrder 
          setView={setView} 
          history={orderHistory} 
        />
      )}
      {view === 'orderlist' && (
        <OrderList 
          setView={setView} 
          orders={orders}
          onDeleteOrder={handleDeleteOrder}
          onAddToOrder={handleAddToOrder}
        />
      )}
      {view === 'reachus' && (
        <ReachUs setView={setView} />
      )}
    </div>    
  )
}

export default App