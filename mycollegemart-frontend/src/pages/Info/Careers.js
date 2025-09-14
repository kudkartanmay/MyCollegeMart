import React from 'react';
import { motion } from 'framer-motion';

const Careers = () => (
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
          <span className="text-3xl z-10 relative">🚀</span>
        </span>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900 dark:text-white"
        >
          Careers
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="font-semibold mb-2 text-slate-800 dark:text-slate-200">Join Our Team!</p>
        <p className="mb-1 text-slate-700 dark:text-slate-300">
          We're a passionate team of students building MyCollegeMart to make campus life more affordable and connected.
          While we don't have open positions right now, we're always looking for talented, driven individuals who want to make a difference in the student community.
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          If you love tech, design, marketing, or just want to help shape the future of student marketplaces, send us a message at <a href="mailto:team@mycollegemart.com" className="text-indigo-600 dark:text-indigo-400 underline">team@mycollegemart.com</a>.<br />
          Let's build something amazing together!
        </p>
      </motion.div>
    </motion.div>
  </div>
);

export default Careers;
