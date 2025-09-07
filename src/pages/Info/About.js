import React from 'react';
import PlaceholderPage from '../../components/common/PlaceholderPage';

const About = ({ onNavigate }) => (
  <PlaceholderPage title="About Us">
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Our Mission</h2>
      <p>
        We understand the financial pressures of college life. Our mission is to create a trusted, 
        easy-to-use marketplace where you can buy and sell college essentials directly with your peers, 
        saving money and making a little extra cash on the side.
      </p>
      
      <h2 className="text-2xl font-bold">Core Values</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>For Students, By Students:</strong> A community-driven platform.</li>
        <li><strong>Smart Savings:</strong> Find affordable textbooks and essentials.</li>
        <li><strong>Campus Sustainability:</strong> Give your college items a second life.</li>
      </ul>
      
      <div className="mt-8">
        <button 
          onClick={() => onNavigate('Marketplace')}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700"
        >
          Explore Marketplace
        </button>
      </div>
    </div>
  </PlaceholderPage>
);

export default About;
