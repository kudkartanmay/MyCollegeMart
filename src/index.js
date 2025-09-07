import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import the CSS with Tailwind directives
import App from './App';

// Ensure ReactDOM is available before rendering
const container = document.getElementById('root');
// Create a root only once
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
