import React, { useState, useEffect } from 'react';

const FlashDealBanner = ({ onNavigate, dealProduct, customDeadline }) => {
  const calculateTimeLeft = React.useCallback(() => {
    // Use custom deadline if provided, otherwise set default (24 hours from now)
    const deadline = customDeadline || (() => {
      const date = new Date();
      date.setHours(date.getHours() + 24);
      return date;
    })();
    
    const difference = +deadline - +new Date();
    
    // Initialize with zeros in case difference is negative
    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60))), // No % 24 to show total hours
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return timeLeft;
  }, [customDeadline]);

  // Set initial state and timer
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Only update if timer is still active
    if (!isActive) return;
    
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Check if timer has expired
      if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsActive(false);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, isActive, customDeadline, calculateTimeLeft]);

  // Create a mockDealProduct if none is provided through props
  const mockDealProduct = {
    id: 'flash-deal-1',
    name: 'Organic Chemistry Model Kit',
    price: 1800,
    description: 'Complete organic chemistry model kit with atoms, bonds and tools.',
    imageUrl: 'https://placehold.co/400x300/6366f1/ffffff?text=Chemistry+Kit',
    category: 'Lab Equipment',
    rating: 4.8
  };

  // Use provided dealProduct or fallback to mock
  const productToShow = dealProduct || mockDealProduct;

  const handleShopNow = (e) => {
    e.preventDefault();
    console.log("Shop Now button clicked!");
    
    // Navigate to product detail page with the deal product
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate('ProductDetail', productToShow);
    } else {
      console.error("Navigation function not available");
    }
  };

  // Timer box component for cleaner code
  const TimerBox = ({ value, label }) => (
    <div className="px-3 py-2 bg-fuchsia-900/70 border border-white/10 rounded-md min-w-[60px] text-center">
      <span className="text-2xl font-bold text-white">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] block text-fuchsia-200 font-semibold tracking-wide">{label}</span>
    </div>
  );

  return (
    <section className="relative bg-gradient-to-r from-indigo-800 via-fuchsia-800 to-purple-800 text-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
      {/* left-to-right sweep glow (full width, faster) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg z-10" aria-hidden="true">
        <span
          className="absolute top-0 bottom-0 left-0 w-full"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%)',
            filter: 'blur(8px)',
            animation: 'bannerSweep 2s linear infinite'
          }}
        />
      </div>
      {/* content */}
      <div className="relative z-20">
        <h2 className="text-2xl font-extrabold">⚡️ Flash Deal!</h2>
        <p className="mt-0.5 text-white/90">Get the Organic Chemistry Model Kit for just ₹1800!</p>
      </div>
      <div className="relative z-20 flex items-center gap-4 mt-4 md:mt-0">
        <div className="flex gap-2 text-center">
          <TimerBox value={timeLeft.hours} label="HRS" />
          <TimerBox value={timeLeft.minutes} label="MIN" />
          <TimerBox value={timeLeft.seconds} label="SEC" />
        </div>
        <button 
          onClick={handleShopNow}
          className="bg-slate-100 text-black font-bold py-3 px-6 rounded-lg hover:bg-white transition-colors border border-slate-200 dark:bg-white dark:text-indigo-900 dark:hover:bg-indigo-50"
          aria-label="Shop the flash deal now"
        >
          Shop Now
        </button>
      </div>
      {/* inline keyframes for the sweep animation */}
      <style>{`
        @keyframes bannerSweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default FlashDealBanner;
