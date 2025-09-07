import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '../context/GlobalStateContext';
import ProductCard from '../components/product/ProductCard';
import FlashDealBanner from '../components/common/FlashDealBanner';
import Sidebar from '../components/layout/Sidebar'; // Import the Sidebar component
import PrimePromoPopup from '../components/common/PrimePromoPopup';

const Home = ({ onNavigate }) => {
  const { state } = useGlobalState();
  const [showPrimePopup, setShowPrimePopup] = useState(false);
  const featuredProducts = state.products.items.slice(0, 4);
  const deadline = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours from now
  const dealProduct = state.products.items.find(p => p.id === 3);
  const isPrimeMember = state.user?.isPrimeMember;

  // Delay showing the popup to make it less annoying
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrimePopup(true);
    }, 5000); // Show after 5 seconds
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24 relative">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20 px-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white"
        >
          The Engineering Student Marketplace
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300"
        >
          Buy & sell textbooks, notes, lab gear, and gadgets with fellow students.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex justify-center gap-4"
        >
          <button onClick={() => onNavigate('Marketplace')} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">Shop Now</button>
          <button onClick={() => onNavigate('Sell')} className="px-8 py-3 bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 font-semibold rounded-full shadow-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-transform transform hover:scale-105">Sell Items</button>
        </motion.div>
      </motion.section>
      
      {/* Flash Deal */}
      <FlashDealBanner deadline={deadline} onNavigate={onNavigate} dealProduct={dealProduct} />

      {/* Main content with sidebar */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64">
          <Sidebar onNavigate={onNavigate} />
        </div>

        {/* Featured Products Section */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Items</h2>
            
            {/* Prime Button */}
            {!isPrimeMember && (
              <button 
                onClick={() => onNavigate('PrimeMembership')}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow hover:from-amber-600 hover:to-amber-700 transition-all transform hover:scale-105"
              >
                <span className="mr-2 text-lg">✨</span>
                <span className="font-bold">Join Prime</span>
                <span className="ml-1 text-sm font-normal">₹299/yr</span>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onProductSelect={(p) => onNavigate('ProductDetail', p)} 
              />
            ))}
          </div>
        </section>
      </div>
      
      {/* Prime Popup */}
      <AnimatePresence>
        {showPrimePopup && !isPrimeMember && (
          <PrimePromoPopup 
            onClose={() => setShowPrimePopup(false)}
            onLearnMore={() => {
              onNavigate('PrimeMembership');
              setShowPrimePopup(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
