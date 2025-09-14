import React from 'react';
import PlaceholderPage from '../../components/common/PlaceholderPage';

const SellerDashboard = () => {
  return (
    <PlaceholderPage title="📈 Seller Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Sales</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">₹12,500</p>
        </div>
        <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">Active Listings</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">8</p>
        </div>
        <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">Seller Rating</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">4.9/5</p>
        </div>
      </div>
      <h3 className="text-2xl font-bold mt-8 mb-4">Manage Your Listings</h3>
      <p>This is where your listings would appear. Currently in development.</p>
    </PlaceholderPage>
  );
};

export default SellerDashboard;
