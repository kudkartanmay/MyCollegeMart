import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => (
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
          <span className="text-3xl z-10 relative">📜</span>
        </span>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900 dark:text-white"
        >
          Terms of Service
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2">
          Welcome to MyCollegeMart!
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <b>Community:</b> MyCollegeMart is a student-to-student marketplace
            for your campus. Use it to buy, sell, or exchange items with fellow
            students.
          </li>
          <li>
            <b>Honesty:</b> List only genuine items and provide accurate
            descriptions and images. Misleading listings may be removed.
          </li>
          <li>
            <b>Safety:</b> Meet at campus pickup points (Library or Canteen) for
            all exchanges. Never share sensitive personal information.
          </li>
          <li>
            <b>Transactions:</b> MyCollegeMart provides the platform, but is not
            responsible for the quality of items or payment disputes. Always
            inspect items before paying.
          </li>
          <li>
            <b>Prime:</b> Prime membership is non-refundable and non-transferable.
            Benefits are subject to change with notice.
          </li>
          <li>
            <b>Respect:</b> Treat all users with respect. Harassment, spam, or
            abuse will result in account suspension.
          </li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm">
          By using MyCollegeMart, you agree to these terms and our community
          guidelines. We may update these terms as the platform evolves.
        </p>
      </motion.div>
    </motion.div>
  </div>
);

export default Terms;
