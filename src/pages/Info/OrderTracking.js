import React from 'react';
import PlaceholderPage from '../../components/common/PlaceholderPage';

const OrderTracking = () => {
  return (
    <PlaceholderPage title="🚚 Track Your Order">
      <p>Order #MCM123456</p>
      <div className="mt-6">
        <ol className="relative border-l border-gray-200 dark:border-gray-700">                  
          <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 7th, 2025</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delivered</h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Your order has been delivered to your campus address.</p>
          </li>
          <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 6th, 2025</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Placed</h3>
          </li>
        </ol>
      </div>
    </PlaceholderPage>
  );
};

export default OrderTracking;
