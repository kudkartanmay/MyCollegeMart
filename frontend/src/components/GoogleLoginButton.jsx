import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// The component now accepts an 'isLoginView' prop to change its text
function GoogleLoginButton({ isLoginView }) {
    const { login } = useAuth();

    const handleGoogleSuccess = async (credentialResponse) => {
        const idToken = credentialResponse.credential;
        try {
            // Send the Google ID token to your backend (this will now work)
            const response = await axios.post('/api/auth/google', { token: idToken });

            // Save the JWT from our backend and redirect
            login(response.data.accessToken);
            alert("Login successful!");
            window.location.href = '/';

        } catch (error) {
            console.error("Login failed:", error);
            alert("Google login failed. Please try again.");
        }
    };

    const handleGoogleError = () => {
        console.error('Google Login Failed');
        alert('Google login failed. Please try again.');
    };

    return (
        <div className="flex justify-center">
            {/* Using the official button that provides the correct token,
          but we can customize the text for the user's experience */}
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text={isLoginView ? 'signin_with' : 'signup_with'} // This changes the text
                theme="outline"
                size="large"
            />
        </div>
    );
}

export default GoogleLoginButton;