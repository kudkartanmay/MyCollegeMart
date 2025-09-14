import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';

const PrimeMembership = ({ onNavigate }) => {
  const { state, dispatch } = useGlobalState();
  const [showExtraFeatures, setShowExtraFeatures] = useState(false);
  
  const primeProduct = {
    id: 'prime-membership',
    name: 'MyCollegeMart Prime Membership',
    price: 299,
    description: 'Annual subscription for exclusive benefits and features.',
    imageUrl: 'https://placehold.co/300x300/f0abfc/1e1b4b?text=Prime',
    category: 'Membership',
    isPrime: true
  };

  const handleAddToCart = () => {
    if (state.cart?.items?.['prime-membership']) {
      dispatch({
        type: actionTypes.ADD_NOTIFICATION,
        payload: { message: 'Prime Membership can only be added once.', type: 'error' }
      });
      return;
    }
    dispatch({ type: actionTypes.ADD_TO_CART, payload: primeProduct });
    dispatch({
      type: actionTypes.ADD_NOTIFICATION,
      payload: { message: 'Prime Membership added to cart!', type: 'success' }
    });
  };

  const FeatureCard = ({ title, children, icon }) => (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 h-full"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-slate-600 dark:text-slate-400">{children}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header section with new gradient and layout */}
        <div className="relative bg-gradient-to-br from-indigo-900 via-fuchsia-900 to-slate-900 px-8 py-16 rounded-2xl overflow-hidden text-center">
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='%23a855f7' opacity='0.05' d='M0 50L50 0L100 50L50 100z'/></svg>")`,
              backgroundSize: '20px 20px' 
            }}
          ></div>
          
          {/* left-to-right sweep glow animation */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg z-10" aria-hidden="true">
            <span
              className="absolute top-0 bottom-0 left-0 w-full"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
                filter: 'blur(8px)',
                animation: 'bannerSweep 3s linear infinite'
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">MyCollegeMart Prime</h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">Unlock exclusive benefits designed for engineering students.</p>
            <div className="mt-8">
              <motion.button 
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-bold rounded-full transition-all shadow-2xl"
                title="Add Prime Membership to your cart"
              >
                Join Prime — ₹299/year
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Main content */}
        <div className="p-4 md:p-8 space-y-12">
          {/* Core benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon="🚚" title="Free Campus Delivery">Get your items delivered to your hostel or campus pickup points for free.</FeatureCard>
            <FeatureCard icon="⏳" title="Early Access">Get a 24-hour head start on newly listed textbooks and popular items.</FeatureCard>
            <FeatureCard icon="💰" title="Exclusive Deals">Special discounts on stationery, gadgets, and premium listings.</FeatureCard>
          </div>

          {/* Expandable section for additional features */}
          <div>
            <button 
              onClick={() => setShowExtraFeatures(!showExtraFeatures)}
              className="w-full py-5 text-left flex justify-between items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-6 hover:bg-slate-200 dark:hover:bg-slate-700/70 text-slate-900 dark:text-white transition-all"
              title={showExtraFeatures ? 'Hide extra features' : 'Show more Prime features'}
            >
              <span className="text-xl font-semibold">Explore More Prime Features</span>
              <motion.span animate={{ rotate: showExtraFeatures ? 45 : 0 }} className="text-2xl font-light">+</motion.span>
            </button>
            
            {showExtraFeatures && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mt-6 space-y-6 overflow-hidden"
              >
                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Assignment & Practical Help</h3>
                      <p className="text-slate-600 dark:text-slate-400">Get expert help with assignments and practicals at special Prime member rates.</p>
                    </div>
                    <span className="text-fuchsia-500 dark:text-fuchsia-400 font-semibold whitespace-nowrap ml-4">PRIME BENEFIT</span>
                  </div>
                  
                  <div className="mt-4 space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span>Standard Deadline (7 days)</span>
                      <div className="text-right">
                        <span className="font-semibold">₹99</span>
                        <span className="text-xs text-slate-500 line-through ml-2">₹149</span>
                        <span className="text-xs text-green-500 ml-2">Save ₹50</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Express Deadline (3 days)</span>
                      <div className="text-right">
                        <span className="font-semibold">₹149</span>
                        <span className="text-xs text-slate-500 line-through ml-2">₹249</span>
                        <span className="text-xs text-green-500 ml-2">Save ₹100</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Urgent Deadline (24 hours)</span>
                      <div className="text-right">
                        <span className="font-semibold">₹249</span>
                        <span className="text-xs text-slate-500 line-through ml-2">₹399</span>
                        <span className="text-xs text-green-500 ml-2">Save ₹150</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('AssignmentHelp')}
                    className="mt-4 w-full py-2 bg-fuchsia-600 text-white font-semibold rounded-lg hover:bg-fuchsia-700 transition"
                  >
                    Request Assignment Help
                  </button>
                </div>
                
                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Exclusive Access to Premium Listings</h3>
                  <p className="text-slate-600 dark:text-slate-400">Some high-demand items are exclusively available to Prime members.</p>
                </div>
                
                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Priority Support</h3>
                  <p className="text-slate-600 dark:text-slate-400">Get faster responses to your questions and support requests.</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* FAQ section */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">How do I get started?</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Simply add the membership to your cart and checkout. Your membership benefits will be activated immediately after payment.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">How will I know if I'm a Prime member?</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Your account page will display a special golden theme indicating your Prime status.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">What payment methods are accepted?</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">We accept online payments through RazorPay and also offer Cash on Delivery options for physical goods.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bannerSweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default PrimeMembership;
