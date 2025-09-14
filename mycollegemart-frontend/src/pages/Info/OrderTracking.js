import React from 'react';
import { motion } from 'framer-motion';

const order = {
  id: 'MCM123456',
  status: 'Delivered',
  timeline: [
    {
      date: 'September 7th, 2025',
      status: 'Delivered',
      description: 'Your order has been delivered to your campus address.',
      completed: true,
    },
    {
      date: 'September 6th, 2025',
      status: 'Order Placed',
      description: '',
      completed: true,
    },
    // Add more steps as needed, e.g.:
    // {
    //   date: 'September 6th, 2025',
    //   status: 'Shipped',
    //   description: 'Your order is on the way.',
    //   completed: false,
    // },
  ],
};

const statusIcon = (completed) => (
  <span className={`h-3 w-3 rounded-full inline-block mr-3 ${completed ? 'bg-green-500' : 'bg-slate-300'}`}></span>
);

const OrderTracking = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-12 px-2">
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
    >
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">🚚</span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Track Your Order</h1>
      </div>
      <div className="mb-6 text-slate-700 dark:text-slate-300 font-mono text-sm">
        Order <span className="font-bold">#{order.id}</span>
      </div>
      <ol className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3">
        {order.timeline.map((step, idx) => (
          <li key={idx} className="mb-8 ml-4">
            <div className="flex items-center">
              {statusIcon(step.completed)}
              <span className={`text-sm ${step.completed ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                {step.date}
              </span>
            </div>
            <div className="ml-6 mt-1">
              <div className={`font-bold ${step.completed ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                {step.status}
              </div>
              {step.description && (
                <div className="text-slate-600 dark:text-slate-400 text-sm mt-1">{step.description}</div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </motion.div>
  </div>
);

export default OrderTracking;
