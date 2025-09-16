import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
// ✅ 1. Import useNavigate for smooth, client-side navigation.
import { useNavigate } from 'react-router-dom';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';
import { auth } from '../../utils/api';

const Login = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { dispatch } = useGlobalState();
    // ✅ 2. Initialize the navigate function.
    const navigate = useNavigate();

    // This function for standard email/password login is correct.
    // We will apply the same improvements to it.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await auth.login({ email, password });
            localStorage.setItem('token', response.token);

            const userProfile = await auth.getCurrentUser();
            // ✅ 3. Save the user profile to localStorage to persist the session.
            localStorage.setItem('user', JSON.stringify(userProfile));
            dispatch({ type: actionTypes.SET_USER, payload: userProfile });

            // ✅ 4. Use navigate for a better user experience.
            navigate('/');
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Failed to sign in. Please check your credentials.");
        }
        setIsLoading(false);
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setIsLoading(true);
        setError('');
        try {
            // Step 1: Send Google token to backend, get our app's token back.
            const response = await auth.googleLogin({ token: credentialResponse.credential });
            localStorage.setItem('token', response.token);

            // Step 2: Fetch the full user profile from our backend.
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
            setError(err.message || "Google sign-in failed");
        }
        setIsLoading(false);
    };

    const handleGoogleError = () => {
        console.error("Google Login Failed");
        setError("Google sign-in failed");
    };

    return (
        // --- Your JSX remains exactly the same ---
        <div className="min-h-[80vh] flex flex-col items-center justify-start bg-slate-100 dark:bg-slate-900 pt-10 transition-colors">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-sm p-6 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
            >
                <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-4">Sign in</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-md border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-md border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 font-medium shadow-sm border border-amber-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Signing in...' : 'Continue'}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-4">
                    By continuing, you agree to MyCollegeMart's Conditions of Use and Privacy Notice.
                </p>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-300 dark:border-slate-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">or</span>
                    </div>
                </div>
                <div className="w-full">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        width={300}
                        text="signin_with"
                        shape="rectangular"
                        theme="filled_blue"
                    />
                </div>
            </motion.div>
            <div className="mt-4 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">New to MyCollegeMart?</p>
                <button
                    onClick={() => onNavigate('Signup')}
                    className="w-full max-w-sm mt-2 py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-medium rounded-lg transition-colors"
                >
                    Create your MyCollegeMart account
                </button>
            </div>
        </div>
    );
};

export default Login;