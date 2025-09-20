import { useAuth } from '../context/AuthContext';
import React, { useState } from 'react';
import axios from 'axios';
import GoogleLoginButton from '../components/GoogleLoginButton';

function AuthPage() {
    const { login } = useAuth(); // 2. Get the login function from the context

    const [isLoginView, setIsLoginView] = useState(false);
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

            // 3. If the action was a login, save the token using our context function
            if (isLoginView) {
                login(response.data.accessToken);
            }

            alert(isLoginView ? 'Login successful!' : 'Registration successful!');

            // 4. Redirect the user to the homepage after success
            window.location.href = '/';

        } catch (error) {
            // Check if the error response from the backend has a specific message
            if (error.response && error.response.data) {
                alert(error.response.data); // Display the backend's message
            } else {
                // Otherwise, show a generic message
                alert(isLoginView ? 'Login failed!' : 'Registration failed!');
            }
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isLoginView ? 'Sign in to your account' : 'Create your account'}
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {!isLoginView && (
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Name"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={handleChange}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Password"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            {isLoginView ? 'Sign in' : 'Create Account'}
                        </button>
                    </div>
                </form>

                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    OR
                  </span>
                </div>

                <div className="mt-6">
                    <GoogleLoginButton isLoginView={isLoginView}/>
                </div>

                <div className="text-sm text-center">
                    <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-orange-600 hover:text-orange-500">
                        {isLoginView ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;