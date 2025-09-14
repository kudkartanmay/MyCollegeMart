import React from 'react';
import { motion } from 'framer-motion';

const PrimePromoPopup = ({ onClose, onLearnMore }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(2px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 16, filter: 'blur(2px)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed bottom-5 right-5 w-72 rounded-lg shadow-xl z-50 overflow-hidden transform-gpu will-change-transform"
    >
      {/* Main container with gradient background */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-400 p-4 relative">
        {/* animated panel glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 rounded-xl bg-white/10 blur-xl animate-pulse"
        />
        {/* Wrapper to ensure content is stacked above the glow */}
        <div className="relative">
          {/* Close button */}
          <button 
            onClick={onClose} 
            className="absolute -top-2 -right-2 text-slate-800/80 hover:text-slate-900 bg-black/10 hover:bg-black/20 p-1 rounded-full transition-colors"
            aria-label="Close popup"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Header with logo */}
          <div className="flex items-center mb-3">
            <span className="text-2xl text-slate-900 mr-2">✨</span>
            <h3 className="text-xl font-bold text-slate-900">MyCollegeMart Prime</h3>
          </div>
          
          {/* Main content */}
          <p className="text-slate-800 mb-3 leading-snug">
            Get exclusive deals, free campus delivery, and special access to premium study materials!
          </p>
          
          {/* Inner highlight - higher contrast, neutral overlay */}
          <div className="rounded-md mb-4 bg-slate-900/35 text-white border border-white/15 shadow-sm">
            <div className="flex items-start space-x-2 px-2.5 py-2">
              <span className="text-xl pt-0.5">📚</span>
              <p className="text-sm leading-tight">
                Get special discounts on assignment help and practical support!
              </p>
            </div>
          </div>
          
          {/* Price and button */}
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-slate-900 text-xl">
              ₹299<span className="text-sm font-normal">/year</span>
            </span>
            <div className="relative">
              {/* animated glow behind the button */}
              <span
                aria-hidden="true"
                className="absolute -inset-1 rounded-md bg-white/25 blur-md animate-pulse"
              />
              <button
                onClick={onLearnMore}
                className="relative z-10 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrimePromoPopup;
