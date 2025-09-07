import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';

const PrimeMembership = ({ onNavigate }) => {
  const { dispatch } = useGlobalState();
  const [showExtraFeatures, setShowExtraFeatures] = useState(false);
  
  const primeProduct = {
    id: 'prime-membership',
    name: 'MyCollegeMart Prime Membership',
    price: 299,
    description: 'Annual subscription for exclusive benefits and features.',
    imageUrl: 'https://placehold.co/300x300/f59e0b/ffffff?text=Prime',
    category: 'Membership',
    isPrime: true
  };

  const handleAddToCart = () => {
    dispatch({ 
      type: actionTypes.ADD_TO_CART, 
      payload: primeProduct
    });
    dispatch({ 
      type: actionTypes.ADD_NOTIFICATION, 
      payload: { message: 'Prime Membership added to cart!', type: 'success' } 
    });
  };

  return (
    <div className="min-h-[60vh] py-12">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg">
        {/* Header section with gradient background */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-12 relative">
          <div className="absolute top-4 right-4 text-2xl">✨</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">MyCollegeMart Prime</h1>
          <p className="mt-4 text-lg text-white/90">Unlock exclusive benefits designed for engineering students</p>
        </div>

        {/* Main content */}
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-xl font-semibold text-slate-900 dark:text-white">Join Prime for just <span className="text-amber-500">₹299</span>/year</div>
              <p className="text-slate-700 dark:text-slate-300">Renewable annually. Cancel anytime.</p>
            </div>
            <button 
              onClick={handleAddToCart}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center"
            >
              Add Prime to Cart
            </button>
          </div>

          {/* Core benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Free Campus Delivery</h3>
              <p className="text-slate-700 dark:text-slate-300">Get your items delivered to your hostel for free.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Early Access</h3>
              <p className="text-slate-700 dark:text-slate-300">Get a 24-hour head start on newly listed textbooks.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Exclusive Deals</h3>
              <p className="text-slate-700 dark:text-slate-300">Special discounts on stationery and gadgets.</p>
            </div>
          </div>

          {/* Expandable section for additional features */}
          <div>
            <button 
              onClick={() => setShowExtraFeatures(!showExtraFeatures)}
              className="w-full py-4 text-left flex justify-between items-center bg-slate-50 dark:bg-slate-800 rounded-lg px-5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
            >
              <span className="text-xl font-semibold">Explore More Prime Features</span>
              <span>{showExtraFeatures ? '−' : '+'}</span>
            </button>
            
            {showExtraFeatures && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-4"
              >
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Engineering Drawing Assignment Help</h3>
                      <p className="text-slate-600 dark:text-slate-300">Specially designed for First Year Engineering students. Get expert help with your engineering drawing assignments.</p>
                    </div>
                    <span className="text-amber-500 dark:text-amber-400 font-semibold">PRIME EXCLUSIVE</span>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                      <span>Standard Deadline (7 days)</span>
                      <span>₹200/assignment</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
                      <span>Express Deadline (3 days)</span>
                      <span>₹350/assignment</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Urgent Deadline (24 hours)</span>
                      <span>₹500/assignment</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Exclusive Access to Premium Listings</h3>
                  <p className="text-slate-300">Some high-demand items are exclusively available to Prime members.</p>
                </div>
                
                <div className="bg-slate-800 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Priority Support</h3>
                  <p className="text-slate-300">Get faster responses to your questions and support requests.</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* FAQ section - improved contrast */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">How do I get started?</h3>
                <p className="text-slate-700 dark:text-slate-300 mt-1">Simply add the membership to your cart and checkout. Your membership benefits will be activated immediately after payment.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">How will I know if I'm a Prime member?</h3>
                <p className="text-slate-700 dark:text-slate-300 mt-1">Your account page will display a special golden theme indicating your Prime status.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">What payment methods are accepted?</h3>
                <p className="text-slate-700 dark:text-slate-300 mt-1">We accept online payments through RazorPay and also offer Cash on Delivery options for physical goods.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeMembership;
