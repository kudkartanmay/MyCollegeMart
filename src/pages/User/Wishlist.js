import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '../../context/GlobalStateContext';
import ProductCard from '../../components/product/ProductCard';

const Wishlist = ({ onNavigate }) => {
  const { state } = useGlobalState();
  const wishlistedProducts = state.products.items.filter(p => state.wishlist.includes(p.id));

  return (
    <div className="min-h-[60vh] py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-8">💖 Your Wishlist</h1>
        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map(product => (
              <ProductCard key={product.id} product={product} onProductSelect={(p) => onNavigate('ProductDetail', p)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-lg shadow">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold">Your Wishlist is Empty</h2>
            <p className="mt-2 text-slate-500">Click the heart on products to save them for later.</p>
            <button onClick={() => onNavigate('Marketplace')} className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700">
              Find Items to Love
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Wishlist;
