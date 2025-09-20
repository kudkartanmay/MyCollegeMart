import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleLoginButton() {
    const handleGoogleSuccess = async (credentialResponse) => {
        console.log("Google response:", credentialResponse);
        const idToken = credentialResponse.credential;

        try {
            // Send the Google ID token to your backend
            const response = await axios.post('/api/auth/google', { token: idToken });
            console.log("Backend response:", response.data);

            // Here you would typically save the JWT from your backend and redirect the user
            alert("Login successful!");
            // Example: localStorage.setItem('token', response.data.accessToken);
            // Example: window.location.href = '/';
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
        <div className="mt-4 flex justify-center">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
            />
        </div>
    );
}

export default GoogleLoginButton;