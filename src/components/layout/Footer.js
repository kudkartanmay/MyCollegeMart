import React from 'react';

const Footer = ({ onNavigate, onNavigateWithCategory }) => (
  <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Solutions</h3>
          <ul className="mt-4 space-y-4">
            <li><button onClick={() => onNavigateWithCategory('Textbooks')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center">Textbooks</button></li>
            <li><button onClick={() => onNavigateWithCategory('Notes')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center">Notes</button></li>
            <li><button onClick={() => onNavigateWithCategory('Lab Equipment')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center">Lab Equipment</button></li>
            <li><button onClick={() => onNavigateWithCategory('Gadgets')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center">Gadgets</button></li>
            <li><button onClick={() => onNavigateWithCategory('Stationery')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center">Stationery</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Support</h3>
          <ul className="mt-4 space-y-4">
            <li><button onClick={() => onNavigate('Pricing')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Pricing</button></li>
            <li><button onClick={() => onNavigate('FAQ')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">FAQ</button></li>
            <li><button onClick={() => onNavigate('Contact')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Contact Us</button></li>
            <li><button onClick={() => onNavigate('OrderTracking')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Track Order</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Company</h3>
          <ul className="mt-4 space-y-4">
            <li><button onClick={() => onNavigate('About')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">About</button></li>
            <li><button onClick={() => onNavigate('Careers')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Careers</button></li>
            <li><button onClick={() => onNavigate('StudyCorner')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Study Corner</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">For Sellers</h3>
          <ul className="mt-4 space-y-4">
            <li><button onClick={() => onNavigate('Sell')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Sell Item</button></li>
            <li><button onClick={() => onNavigate('SellerDashboard')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Dashboard</button></li>
            <li><button onClick={() => onNavigate('BookExchange')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Book Exchange</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Legal</h3>
          <ul className="mt-4 space-y-4">
            <li><button onClick={() => onNavigate('Privacy')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Privacy</button></li>
            <li><button onClick={() => onNavigate('Terms')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Terms</button></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8 flex items-center justify-between">
        <p className="text-base text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} MyCollegeMart. All rights reserved.</p>
        {/* Social icons would go here */}
      </div>
    </div>
  </footer>
);

export default Footer;
