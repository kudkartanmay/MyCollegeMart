import React from 'react';
import { motion } from 'framer-motion';

const FAQ = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-12 px-2">
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-3xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 relative overflow-hidden"
    >
      {/* Animated gradient accent bar */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'loop' }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      {/* Glowing icon */}
      <div className="flex items-center mb-4">
        <span className="relative mr-3">
          <span className="absolute inset-0 rounded-full bg-indigo-400 blur-xl opacity-30 animate-pulse" />
          <span className="text-3xl z-10 relative">❓</span>
        </span>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900 dark:text-white"
        >
          Frequently Asked Questions
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="space-y-6 mt-4">
          <div>
            <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200">How do I sell an item?</h2>
            <p className="text-slate-700 dark:text-slate-300">
              Click the <b>Sell Item</b> button in the menu or footer, fill out the listing form with your product details, upload images or videos, and submit. Your item will appear in the Marketplace for buyers to discover!
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200">Is it safe?</h2>
            <p className="text-slate-700 dark:text-slate-300">
              Yes! All transactions are limited to your college campus. We recommend meeting at the Library Pickup Point or Canteen for exchanges. Always verify the item before completing payment.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200">How is payment handled?</h2>
            <p className="text-slate-700 dark:text-slate-300">
              You can pay online using RazorPay (UPI, cards, netbanking) or choose Cash on Delivery for most items. Prime membership requires online payment. Student Wallet balance can also be used for discounts at checkout.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

export default FAQ;
