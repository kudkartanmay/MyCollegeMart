import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import the CSS with Tailwind directives
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = '30561089880-65f9jvksmah2ki6k6fkolb7rijqcmmo7.apps.googleusercontent.com'; // Replace with your actual client ID

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
