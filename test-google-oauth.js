import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = '30561089880-65f9jvksmah2ki6k6fkolb7rijqcmmo7.apps.googleusercontent.com'; // Replace with your actual client ID

const TestGoogleOAuth = () => {
  const handleSuccess = (response) => {
    console.log('Login Success:', response);
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        <h1>Test Google OAuth</h1>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default TestGoogleOAuth;
