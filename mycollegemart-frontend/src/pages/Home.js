import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '../context/GlobalStateContext';
import ProductCard from '../components/product/ProductCard';
import FlashDealBanner from '../components/common/FlashDealBanner';
import PrimePromoPopup from '../components/common/PrimePromoPopup';

const Home = ({ onNavigate }) => {
  const { state } = useGlobalState();
  const [showPrimePopup, setShowPrimePopup] = useState(false);
  const featuredProducts = state.products.items.slice(0, 4);
  const deadline = new Date(Date.now() + 12 * 60 * 60 * 1000);
  const dealProduct = state.products.items.find(p => p.id === 3);
  const isPrimeMember = state.user?.isPrimeMember;

  useEffect(() => {
    const timer = setTimeout(() => setShowPrimePopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-12 lg:space-y-20 relative">
      {/* Hero — Amazon-like */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-lg shadow-sm py-16 px-6"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">Campus deals. Fast delivery. Student-first.</h1>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              MyCollegeMart brings textbooks, kits and study essentials together in one marketplace — tailored for engineering students.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onNavigate('Marketplace')}
                className="px-6 py-3 rounded-md bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold shadow-lg transform hover:scale-105 transition"
              >
                Shop Now
              </button>

              <button
                onClick={() => onNavigate('Sell')}
                className="px-6 py-3 rounded-md bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Sell Items
              </button>

              {!isPrimeMember && (
                <button
                  onClick={() => onNavigate('PrimeMembership')}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold shadow inner-glow"
                >
                  ✨ Join Prime — ₹299/yr
                </button>
              )}
            </div>
          </div>

          {/* Search / Quick categories column */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            <div className="mb-4">
              <label className="text-sm text-slate-600 dark:text-slate-300">Search for items</label>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Search textbooks, notes, calculators..."
                  className="flex-1 px-4 py-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onNavigate('Marketplace', { searchQuery: e.target.value });
                  }}
                />
                <button onClick={() => onNavigate('Marketplace')} className="px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Search</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <button className="text-left p-3 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Textbooks</button>
              <button className="text-left p-3 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Calculators</button>
              <button className="text-left p-3 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Drawing Kits</button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Flash Deal */}
      <div className="max-w-6xl mx-auto px-4">
        <FlashDealBanner deadline={deadline} onNavigate={onNavigate} dealProduct={dealProduct} />
      </div>

      {/* Featured products */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured for you</h2>
          <button onClick={() => onNavigate('Marketplace')} className="text-sm text-indigo-600">See all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(p => (
            <ProductCard key={p.id} product={p} onProductSelect={(prod) => onNavigate('ProductDetail', prod)} />
          ))}
        </div>
      </div>

      {/* Prime Popup */}
      <AnimatePresence>
        {showPrimePopup && !isPrimeMember && (
          <PrimePromoPopup onClose={() => setShowPrimePopup(false)} onLearnMore={() => { onNavigate('PrimeMembership'); setShowPrimePopup(false); }} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
