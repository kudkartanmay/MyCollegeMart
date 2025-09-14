import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../context/GlobalStateContext';
import { ShieldCheckIcon, ArrowRightIcon } from '../components/UI/Icons';

const Checkout = ({ onNavigate }) => {
  const { state, dispatch } = useGlobalState();
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, failed
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState('Library Pickup Point'); // Changed default since Hostel is removed
  const [useWallet, setUseWallet] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online', 'cod'

  const cartItems = Object.values(state.cart.items);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const walletBalance = state.studentWallet;
  const amountFromWallet = useWallet ? Math.min(cartTotal, walletBalance) : 0;
  const finalAmount = cartTotal - amountFromWallet;

  // Check if cart contains only a Prime membership
  const hasPrimeMembership = cartItems.some(item => item.id === 'prime-membership');
  const onlyPrimeMembership = cartItems.length === 1 && hasPrimeMembership;
  
  // Helper function to activate Prime membership
  const activatePrimeMembership = () => {
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    
    dispatch({ 
      type: actionTypes.SET_PRIME_MEMBERSHIP, 
      payload: oneYearFromNow.toISOString()
    });
    
    // Display notification about Prime activation
    dispatch({ 
      type: actionTypes.ADD_NOTIFICATION, 
      payload: { 
        message: "✨ Prime membership activated successfully! Enjoy your benefits.", 
        type: 'success' 
      } 
    });
  };

  // Function to initialize RazorPay payment
  const initializeRazorpay = () => {
    setPaymentStatus('processing');
    
    // This would be replaced with actual RazorPay integration
    setTimeout(() => {
      // Success simulation
      const paymentId = 'rzp_' + Date.now().toString();
      setPaymentDetails({ payment_id: paymentId });
      setPaymentStatus('success');
      
      // Handle Prime membership activation if purchased
      if (hasPrimeMembership) {
        activatePrimeMembership();
      }
      
      // Complete order
      if (amountFromWallet > 0) {
        dispatch({ type: actionTypes.USE_WALLET_FUNDS, payload: amountFromWallet });
      }
      dispatch({ type: actionTypes.CLEAR_CART });
      dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: "Payment successful!", type: 'success' } });
    }, 2000);
  };

  const handlePayment = async () => {
    if (finalAmount <= 0) { // If wallet covers everything
      dispatch({ type: actionTypes.USE_WALLET_FUNDS, payload: amountFromWallet });
      
      // Check if Prime membership is in the cart and activate it
      if (hasPrimeMembership) {
        activatePrimeMembership();
      }
      
      setPaymentStatus('success');
      dispatch({ type: actionTypes.CLEAR_CART });
      dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: "Payment successful using wallet!", type: 'success' } });
      return;
    }

    if (paymentMethod === 'online') {
      // Initialize RazorPay
      initializeRazorpay();
    } else if (paymentMethod === 'cod') {
      // Cash on Delivery - Prime membership can't be purchased with COD
      if (hasPrimeMembership) {
        dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: "Prime membership requires online payment", type: 'error' } });
        return;
      }
      
      // Process COD order
      setPaymentStatus('success');
      if (amountFromWallet > 0) {
        dispatch({ type: actionTypes.USE_WALLET_FUNDS, payload: amountFromWallet });
      }
      dispatch({ type: actionTypes.CLEAR_CART });
      dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: "Order placed successfully! Pay when you receive your items.", type: 'success' } });
    }
  };

  // Success screen
  if (paymentStatus === 'success') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="max-w-lg w-full text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg"
        >
          <ShieldCheckIcon className="w-20 h-20 mx-auto text-green-500" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">
            {paymentMethod === 'cod' ? 'Order Placed!' : 'Payment Successful!'}
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {paymentMethod === 'cod' 
              ? 'Your order has been placed. Please pay when you receive your items.'
              : 'Thank you for your purchase.'}
          </p>
          {paymentDetails?.payment_id && (<p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Payment ID: {paymentDetails.payment_id}</p>)}
          <button 
            onClick={() => onNavigate('Marketplace')} 
            className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  // Empty cart screen
  if (cartItems.length === 0 && paymentStatus === 'idle') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Your Cart is Empty</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Add items to your cart before checkout.</p>
        <button onClick={() => onNavigate('Marketplace')} className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700">Go to Marketplace</button>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white text-center">Checkout</h1>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Options - Only show if cart has physical items */}
            {!onlyPrimeMembership && (
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Campus Delivery Options</h2>
                <div className="space-y-3">
                  {/* Removed Hostel Gate option */}
                  {['Library Pickup Point', 'Canteen'].map(opt => (
                    <label key={opt} className="flex items-center p-3 border dark:border-slate-700 rounded-lg cursor-pointer transition-colors has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-900/30 dark:has-[:checked]:border-indigo-400">
                      <input 
                        type="radio" 
                        name="delivery" 
                        value={opt} 
                        checked={deliveryOption === opt} 
                        onChange={e => setDeliveryOption(e.target.value)} 
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-3 font-medium text-slate-700 dark:text-slate-300">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {/* Payment Method */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border dark:border-slate-700 rounded-lg cursor-pointer transition-colors has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-900/30 dark:has-[:checked]:border-indigo-400">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="online" 
                    checked={paymentMethod === 'online'} 
                    onChange={() => setPaymentMethod('online')} 
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-3">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Online Payment (RazorPay)</span>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Credit/Debit Card, UPI, NetBanking</p>
                  </div>
                </label>
                
                <label className={`flex items-center p-3 border dark:border-slate-700 rounded-lg transition-colors ${
                  hasPrimeMembership ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 dark:has-[:checked]:bg-indigo-900/30 dark:has-[:checked]:border-indigo-400'
                }`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => !hasPrimeMembership && setPaymentMethod('cod')} 
                    disabled={hasPrimeMembership}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-3">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Cash on Delivery</span>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Pay when you receive your items</p>
                    {hasPrimeMembership && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        Prime membership requires online payment
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Order Summary</h2>
              <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-700">
                {cartItems.map(item => (
                  <li key={item.id} className="py-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">
                        {item.name} 
                        {item.id === 'prime-membership' && <span className="ml-2 text-amber-500">✨</span>}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Payment Details */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Payment</h2>
            
            <div className="mt-4 space-y-2 border-b dark:border-slate-700 pb-4 mb-4">
              <div className="flex justify-between items-center text-slate-800 dark:text-slate-100">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              {useWallet && <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                <span>Wallet Discount</span>
                <span>-₹{amountFromWallet.toFixed(2)}</span>
              </div>}
            </div>

            <div className="flex justify-between items-center text-xl font-bold text-slate-900 dark:text-white">
              <span>To Pay</span>
              <span>₹{finalAmount.toFixed(2)}</span>
            </div>
            
            <label className="mt-4 flex items-center p-3 border dark:border-slate-600 rounded-lg cursor-pointer has-[:checked]:bg-green-50 has-[:checked]:border-green-500 dark:has-[:checked]:bg-green-900/20 dark:has-[:checked]:border-green-400">
              <input 
                type="checkbox" 
                checked={useWallet} 
                onChange={e => setUseWallet(e.target.checked)} 
                className="h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <span className="ml-3 font-medium text-slate-800 dark:text-slate-200">Use Student Wallet (Balance: ₹{walletBalance.toFixed(2)})</span>
            </label>
            
            <button 
              onClick={handlePayment} 
              disabled={paymentStatus === 'processing'}
              className="mt-6 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center transition-colors disabled:bg-indigo-400"
            >
              {paymentStatus === 'processing' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : paymentMethod === 'cod' ? (
                'Place Order'
              ) : finalAmount <= 0 ? (
                'Place Order'
              ) : (
                <>
                  Pay ₹{finalAmount.toFixed(2)} <ArrowRightIcon />
                </>
              )}
            </button>
            
            {paymentMethod === 'online' && (
              <p className="mt-2 text-xs text-center text-slate-500 dark:text-slate-400">
                Secured by RazorPay Payment Gateway
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;
