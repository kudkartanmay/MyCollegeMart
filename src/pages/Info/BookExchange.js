import React from 'react';
import PlaceholderPage from '../../components/common/PlaceholderPage';

const BookExchange = () => {
  return (
    <PlaceholderPage title="🔄 Book Exchange Community">
      <p>Looking to trade instead of buy? Post your request here!</p>
      <div className="mt-6 space-y-4">
        <div className="p-4 border rounded-lg">
          <p><strong>Have:</strong> Intro to Psychology | <strong>Want:</strong> Advanced Economics</p>
          <p className="text-sm text-slate-500">Posted by Alex Doe</p>
        </div>
      </div>
    </PlaceholderPage>
  );
};

export default BookExchange;
