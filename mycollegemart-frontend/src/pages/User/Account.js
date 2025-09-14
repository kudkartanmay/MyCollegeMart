import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '../../context/GlobalStateContext';
import { 
  ClipboardListIcon, 
  LocationMarkerIcon, 
  CogIcon, 
  LogoutIcon,
  WalletIcon 
} from '../../components/UI/Icons';

const Account = ({ onNavigate }) => {
  const { state } = useGlobalState();
  const user = { 
    displayName: 'Tanmay Vijay Kudkar', 
    email: 'kudkartanmay25@gmail.com',
    initials: 'TV'
  };
  
  const isPrimeMember = state.user?.isPrimeMember;
  const primeExpiryDate = state.user?.primeExpiryDate;

  const menuItems = [
    { name: 'My Listings', icon: <ClipboardListIcon />, page: 'SellerDashboard' },
    { name: 'Track Orders', icon: <LocationMarkerIcon />, page: 'OrderTracking' },
    { name: 'Settings', icon: <CogIcon />, page: 'Settings' },
    { name: 'Logout', icon: <LogoutIcon />, page: 'Home', action: 'logout' },
  ];

  const handleMenuClick = (item) => {
    // For logout, we would typically clear authentication state
    if (item.action === 'logout') {
      // In a real app, clear auth tokens, user session, etc.
      console.log('Logging out user');
      // Then navigate to home
    }
    onNavigate(item.page);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-5xl mx-auto py-8 px-4"
    >
      {/* User profile card with Prime indicator if applicable */}
      <div className={`flex flex-col md:flex-row items-center gap-6 p-6 rounded-lg ${
        isPrimeMember 
          ? 'bg-gradient-to-r from-amber-100 to-white dark:from-amber-900/50 dark:to-slate-900 border border-amber-200 dark:border-amber-700/30' 
          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
      }`}>
        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold ${
          isPrimeMember 
            ? 'bg-gradient-to-br from-amber-400 to-amber-600 ring-2 ring-amber-300/50' 
            : 'bg-indigo-600'
        }`}>
          {user.initials}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{user.displayName}</h1>
            {isPrimeMember && (
              <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded flex items-center">
                <span className="mr-1">✨</span> PRIME
              </span>
            )}
          </div>
          <p className={`${isPrimeMember ? 'text-amber-700 dark:text-amber-200' : 'text-slate-500 dark:text-slate-400'}`}>
            {user.email}
          </p>
          {isPrimeMember && primeExpiryDate && (
            <p className="text-amber-600 dark:text-amber-300 text-sm mt-1">
              Prime membership active until: {new Date(primeExpiryDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Menu sidebar */}
        <div className="md:col-span-1 space-y-3">
          {menuItems.map(item => (
            <button 
              key={item.name} 
              onClick={() => handleMenuClick(item)} 
              className="w-full flex items-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="mr-3 text-indigo-600 dark:text-indigo-400">
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
          {!isPrimeMember && (
            <button 
              onClick={() => onNavigate('PrimeMembership')} 
              className="w-full flex items-center p-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-colors"
            >
              <span className="mr-3">✨</span>
              <span className="font-medium">Join Prime</span>
            </button>
          )}
        </div>
        
        {/* Main content area - Student wallet */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <WalletIcon className="mr-2 text-indigo-600 dark:text-indigo-400"/> 
              Student Wallet
            </h2>
            <p className="text-4xl font-bold text-green-500">₹{state.studentWallet.toFixed(2)}</p>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Use your wallet balance for discounts at checkout!
            </p>
            
            <div className="mt-6">
              <button 
                onClick={() => onNavigate('PrimeMembership')} 
                className="bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-700 transition-colors"
              >
                Add Money
              </button>
              
              <button 
                onClick={() => onNavigate('OrderTracking')} 
                className="ml-3 bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded font-medium border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-600 transition-colors"
              >
                View Transactions
              </button>
            </div>
          </div>
          
          {/* Prime Benefits Section (if Prime member) */}
          {isPrimeMember && (
            <div className="mt-6 bg-gradient-to-r from-amber-100 to-white dark:from-amber-900/30 dark:to-slate-800 p-6 rounded-lg border border-amber-200 dark:border-amber-700/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center text-amber-800 dark:text-amber-200">
                  <span className="mr-2">✨</span> 
                  Prime Benefits
                </h2>
                <button 
                  onClick={() => onNavigate('PrimeMembership')}
                  className="text-sm text-amber-600 dark:text-amber-300 hover:underline"
                >
                  View Details
                </button>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/50 dark:bg-slate-800/50 p-3 rounded border border-amber-200 dark:border-amber-700/30">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200">Free Campus Delivery</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">All your orders delivered free</p>
                </div>
                <div className="bg-white/50 dark:bg-slate-800/50 p-3 rounded border border-amber-200 dark:border-amber-700/30">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200">Exclusive Listings</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">Access to premium items</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Account;
