import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => (
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
          <span className="text-3xl z-10 relative">🔒</span>
        </span>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900 dark:text-white"
        >
          Privacy Policy
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2">
          Your Privacy Matters
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <b>Data Collection:</b> We collect only the information needed to run MyCollegeMart, such as your name, email, and college branch.
          </li>
          <li>
            <b>Usage:</b> Your data is used to personalize your experience, enable transactions, and improve the platform.
          </li>
          <li>
            <b>Security:</b> We do not sell your data to third parties. Your information is stored securely and only accessible to authorized personnel.
          </li>
          <li>
            <b>Visibility:</b> Your listings and contact info are visible to other students for transaction purposes only.
          </li>
          <li>
            <b>Payments:</b> Payment details are handled securely by trusted third-party providers (e.g., RazorPay). We do not store your card or UPI info.
          </li>
          <li>
            <b>Updates:</b> This policy will be updated as we add new features. We will notify you of any significant changes.
          </li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm">
          For privacy questions, contact{' '}
          <a
            href="mailto:team@mycollegemart.com"
            className="text-indigo-600 dark:text-indigo-400 underline"
          >
            team@mycollegemart.com
          </a>
          .
        </p>
      </motion.div>
    </motion.div>
  </div>
);

export default Privacy;
