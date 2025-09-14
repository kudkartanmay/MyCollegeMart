import React from 'react';

const Footer = ({ onNavigate }) => (
  <footer className="bg-slate-900 text-slate-200 py-12">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8">
      <div>
        <h4 className="font-semibold mb-3 text-slate-400 uppercase tracking-wider">Solutions</h4>
        <ul className="space-y-2">
          <li>
            <button onClick={() => onNavigate('Marketplace', { category: 'Textbooks' })} className="hover:underline">Textbooks</button>
          </li>
          <li>
            <button onClick={() => onNavigate('Marketplace', { category: 'Notes' })} className="hover:underline">Notes</button>
          </li>
          <li>
            <button onClick={() => onNavigate('Marketplace', { category: 'Lab Equipment' })} className="hover:underline">Lab Equipment</button>
          </li>
          <li>
            <button onClick={() => onNavigate('Marketplace', { category: 'Technical Devices' })} className="hover:underline">Technical Devices</button>
          </li>
          <li>
            <button onClick={() => onNavigate('Marketplace', { category: 'Stationery' })} className="hover:underline">Stationery</button>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-slate-400 uppercase tracking-wider">Support</h4>
        <ul className="space-y-2">
          <li>
            <button onClick={() => onNavigate('Pricing')} className="hover:underline">Pricing</button>
          </li>
          <li>
            <button onClick={() => onNavigate('FAQ')} className="hover:underline">FAQ</button>
          </li>
          <li>
            <button onClick={() => onNavigate('Contact')} className="hover:underline">Contact Us</button>
          </li>
          <li>
            <button onClick={() => onNavigate('OrderTracking')} className="hover:underline">Track Order</button>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-slate-400 uppercase tracking-wider">Company</h4>
        <ul className="space-y-2">
          <li>
            <button onClick={() => onNavigate('About')} className="hover:underline">About</button>
          </li>
          <li>
            <button onClick={() => onNavigate('Careers')} className="hover:underline">Careers</button>
          </li>
          <li>
            <button onClick={() => onNavigate('StudyCorner')} className="hover:underline">Study Corner</button>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-slate-400 uppercase tracking-wider">For Sellers</h4>
        <ul className="space-y-2">
          <li>
            <button onClick={() => onNavigate('Sell')} className="hover:underline">Sell Item</button>
          </li>
          <li>
            <button onClick={() => onNavigate('SellerDashboard')} className="hover:underline">Dashboard</button>
          </li>
          <li>
            <button onClick={() => onNavigate('BookExchange')} className="hover:underline">Book Exchange</button>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-slate-400 uppercase tracking-wider">Legal</h4>
        <ul className="space-y-2">
          <li>
            <button onClick={() => onNavigate('Privacy')} className="hover:underline">Privacy</button>
          </li>
          <li>
            <button onClick={() => onNavigate('Terms')} className="hover:underline">Terms</button>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
