import React, { useState } from 'react';
import axios from 'axios';
import GoogleLoginButton from '../components/GoogleLoginButton';

function AuthPage() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
        const payload = isLoginView ? { email: formData.email, password: formData.password } : formData;

        try {
            const response = await axios.post(endpoint, payload);
            alert(isLoginView ? 'Login successful!' : 'Registration successful!');
            console.log(response.data);
            // TODO: Save the token and redirect
        } catch (error) {
            alert(isLoginView ? 'Login failed!' : 'Registration failed!');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary">
            <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">
                    {isLoginView ? 'Welcome Back' : 'Create Your Account'}
                </h2>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit}>
                    {!isLoginView && (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Name</label>
                            <input type="text" name="name" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" required />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" name="email" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input type="password" name="password" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" required />
                    </div>
                    <button type="submit" className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-orange-500 transition-all">
                        {isLoginView ? 'Login' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-blue-600 hover:underline">
                        {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                    </button>
                </div>

                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Login Button */}
                <GoogleLoginButton />
            </div>
        </div>
    );
}

export default AuthPage;