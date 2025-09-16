import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import the CSS with Tailwind directives
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Note: You need to register http://localhost:3000 as an authorized JavaScript origin
// in the Google Cloud Console for this client ID
const GOOGLE_CLIENT_ID = '30561089880-65f9jvksmah2ki6k6fkolb7rijqcmmo7.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} onScriptLoadError={() => console.error("Google OAuth script failed to load")}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
