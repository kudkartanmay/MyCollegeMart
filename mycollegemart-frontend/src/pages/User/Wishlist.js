import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '../../context/GlobalStateContext';
import ProductCard from '../../components/product/ProductCard';

const PAGE_SIZE = 12;

const Wishlist = ({ onNavigate }) => {
  const { state } = useGlobalState();
  const wishlistedProducts = useMemo(
    () => state.products.items.filter(p => state.wishlist.includes(p.id)),
    [state.products.items, state.wishlist]
  );

  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(wishlistedProducts.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagedItems = wishlistedProducts.slice(start, start + PAGE_SIZE);
  const goToPage = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="min-h-[60vh] py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-8">💖 Your Wishlist</h1>
        {pagedItems.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {pagedItems.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductSelect={(p) => onNavigate('ProductDetail', p)}
                  compact
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm rounded border border-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).slice(
                Math.max(0, currentPage - 3),
                Math.min(totalPages, currentPage + 2)
              ).map((_, idx) => {
                const pageNum = Math.max(1, currentPage - 3) + idx;
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1.5 text-sm rounded border ${
                      pageNum === currentPage
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm rounded border border-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                Next
              </button>
            </div>
          </>
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
