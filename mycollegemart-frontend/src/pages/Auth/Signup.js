import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
// ✅ 1. Import useNavigate for smooth, client-side navigation.
import { useNavigate } from 'react-router-dom';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';
import { auth } from '../../utils/api';

const Signup = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useGlobalState();
    // ✅ 2. Initialize the navigate function.
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    };

    // This function for standard registration is correct.
    // We will apply the same improvements to it.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await auth.register({ email, password });
            
            const loginResponse = await auth.login({ email, password });
            localStorage.setItem('token', loginResponse.token);
            
            const userProfile = await auth.getCurrentUser();
            // ✅ 3. Save the user profile to localStorage to persist the session.
            localStorage.setItem('user', JSON.stringify(userProfile));
            dispatch({ type: actionTypes.SET_USER, payload: userProfile });
            
            // ✅ 4. Use navigate for a better user experience.
            navigate('/');
        } catch (err) {
            console.error("Registration error:", err);
            setError(err.message || "Failed to create account.");
        }
        setIsLoading(false);
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setIsLoading(true);
        setError('');
        try {
            // Step 1: Send Google token to backend. Backend creates the account if new.
            const response = await auth.googleLogin({ token: credentialResponse.credential });
            localStorage.setItem('token', response.token);
            
            // Step 2: Fetch the new user's profile from our backend.
            const userProfile = await auth.getCurrentUser();
            
            // ✅ 3. CRITICAL FIX: Save the user profile to localStorage.
            // This is required for the session to be restored on page refresh.
            localStorage.setItem('user', JSON.stringify(userProfile));
            
            // Step 4: Update the global state to reflect the login immediately.
            dispatch({ type: actionTypes.SET_USER, payload: userProfile });
            
            // ✅ 4. BEST PRACTICE: Use navigate('/') for a smooth redirect without a full page reload.
            navigate('/');

        } catch (err) {
            console.error("Google sign-in error:", err);
            setError(err.message || "Google sign-up failed");
        }
        setIsLoading(false);
    };

    const handleGoogleError = () => {
        console.error("Google Sign-Up Failed");
        setError("Google sign-up failed");
    };

    return (
        // --- Your JSX remains exactly the same ---
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-sm p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg"
            >
                <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Create account</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 font-medium shadow-sm border border-amber-400 disabled:opacity-50"
                    >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                    By creating an account, you agree to MyCollegeMart's Conditions of Use and Privacy Notice.
                </p>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-slate-700" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-slate-800 text-gray-400 dark:text-gray-500">or</span>
                    </div>
                </div>
                <div className="w-full">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        width={300}
                        text="signup_with"
                        shape="rectangular"
                        theme="filled_blue"
                    />
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Already have an account?{' '}
                        <button 
                            onClick={() => onNavigate('Login')} 
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;