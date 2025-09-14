import React from 'react';
import { motion } from 'framer-motion';

const Pricing = ({ user, onNavigate }) => (
  <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-12 px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-5xl"
    >
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Pricing & Membership</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl">
            Simple, transparent pricing for students. Buy items at listed prices — upgrade to Prime for campus delivery, exclusive deals and Prime-only listings.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-slate-500">Your Wallet</div>
            <div className="text-xl font-bold text-emerald-600">₹{user?.wallet?.toFixed?.(2) ?? '0.00'}</div>
          </div>
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold rounded shadow"
          >
            Add Money
          </button>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">Free</div>
          <div className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">No subscription</div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Buy & sell on the marketplace with no listing fees.</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>Standard listings</li>
            <li>Campus pickup</li>
            <li>Use Student Wallet</li>
          </ul>
          <div className="mt-6">
            <button
              onClick={() => onNavigate('Marketplace')}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>

        {/* Prime - Amazon-like highlight */}
        <div className="relative bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-300 dark:border-amber-700 p-6 shadow-xl transform scale-100 md:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase">Best value</div>
              <div className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">Prime</div>
              <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">₹299 / year</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-600 dark:text-slate-300">Save time</div>
              <div className="text-lg font-semibold text-amber-700 dark:text-amber-300">Free campus delivery</div>
            </div>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>Free campus delivery to Library & Canteen</li>
            <li>Access to Prime Exclusive listings</li>
            <li>Early access to flash deals</li>
            <li>Priority seller support</li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => onNavigate('PrimeMembership')}
              className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-900 dark:text-slate-900 shadow-lg"
            >
              <span className="z-10">Join Prime — ₹299/yr</span>
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"
                style={{ mixBlendMode: 'screen' }}
              />
            </button>
            <button
              onClick={() => onNavigate('PrimeMembership')}
              className="px-4 py-2 text-sm border rounded-md border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            >
              See Benefits
            </button>
          </div>

          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">Prime activation requires online payment. Wallet may be applied to other purchases.</div>
        </div>

        {/* Business / Bulk or Pro (optional) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">Pro / Bulk</div>
          <div className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">Custom</div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">For sellers with multiple listings or stores — contact us for campus programs.</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>Bulk listing support</li>
            <li>Seller tools & reports</li>
            <li>Promotions & featured spots</li>
          </ul>
          <div className="mt-6">
            <button
              onClick={() => onNavigate('Contact')}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Comparison / Notes */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Why Prime?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-semibold">Free Campus Delivery</div>
            <div className="text-slate-600 dark:text-slate-300">Delivered to convenient pickup points without extra charge.</div>
          </div>
          <div>
            <div className="font-semibold">Prime-Only Deals</div>
            <div className="text-slate-600 dark:text-slate-300">Exclusive listings and early access to flash deals.</div>
          </div>
          <div>
            <div className="font-semibold">Priority Support</div>
            <div className="text-slate-600 dark:text-slate-300">Faster help for listing issues and disputes.</div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

export default Pricing;
