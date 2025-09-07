import React from 'react';
import { motion } from 'framer-motion';

const PrimePromoPopup = ({ onClose, onLearnMore }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-5 right-5 w-72 rounded-lg shadow-xl z-50 overflow-hidden"
    >
      {/* Main container with gradient background */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 relative">
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1 rounded-full transition-colors"
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Header with logo */}
        <div className="flex items-center mb-3">
          <span className="text-2xl text-white mr-2">✨</span>
          <h3 className="text-xl font-bold text-white">MyCollegeMart Prime</h3>
        </div>
        
        {/* Main content */}
        <p className="text-white mb-3 leading-snug">
          Get exclusive deals, free campus delivery, and special access to premium study materials!
        </p>
        
        {/* Special note - with distinct background for contrast */}
        <div className="bg-black/15 p-2.5 rounded-md mb-4">
          <div className="flex items-start space-x-2">
            <span className="text-xl pt-0.5">📚</span>
            <p className="text-sm text-white leading-tight">
              First year students get special engineering drawing assignment help!
            </p>
          </div>
        </div>
        
        {/* Price and button */}
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-white text-xl">₹299<span className="text-sm font-normal">/year</span></span>
          <button 
            onClick={onLearnMore}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PrimePromoPopup;
