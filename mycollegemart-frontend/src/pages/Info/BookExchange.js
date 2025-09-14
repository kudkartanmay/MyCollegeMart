import React from 'react';
import { motion } from 'framer-motion';

const BookExchange = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-12 px-2">
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-3xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 relative overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'loop' }}
        style={{ backgroundSize: '200% 100%' }}
      />
      <div className="flex items-center mb-4">
        <span className="relative mr-3">
          <span className="absolute inset-0 rounded-full bg-indigo-400 blur-xl opacity-30 animate-pulse" />
          <span className="text-3xl z-10 relative">🔄</span>
        </span>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900 dark:text-white"
        >
          Book Exchange Community
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2">
          Exchange Books with Peers
        </h2>
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Looking to swap textbooks or notes? Post your request here and connect
          with other students who want to exchange study materials. It's free and
          easy!
        </p>
        <div className="mt-6 space-y-4">
          <div className="p-4 border rounded-lg bg-white dark:bg-slate-800">
            <p>
              <strong>Have:</strong> Intro to Psychology | <strong>Want:</strong>{' '}
              Advanced Economics
            </p>
            <p className="text-sm text-slate-500">Posted by Alex Doe</p>
          </div>
          <div className="p-4 border rounded-lg bg-white dark:bg-slate-800">
            <p>
              <strong>Have:</strong> Engineering Drawing Kit | <strong>Want:</strong>{' '}
              Surveying Equipment
            </p>
            <p className="text-sm text-slate-500">Posted by Priya S.</p>
          </div>
        </div>
        <p className="mt-6 text-slate-600 dark:text-slate-400 text-sm">
          To post your own exchange request, click "Sell Item" and select "Book
          Exchange" as the category.
        </p>
      </motion.div>
    </motion.div>
  </div>
);

export default BookExchange;
