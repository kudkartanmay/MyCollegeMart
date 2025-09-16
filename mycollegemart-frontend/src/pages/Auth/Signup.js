import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';
import { auth } from '../../utils/api';

const Signup = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useGlobalState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await auth.register({ email, password });
      
      // Optionally auto-login after registration
      const loginResponse = await auth.login({ email, password });
      localStorage.setItem('token', loginResponse.token);
      
      // Fetch user profile and update global state
      const userProfile = await auth.getCurrentUser();
      dispatch({ type: actionTypes.SET_USER, payload: userProfile });
      
      window.location.href = '/';
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
    }
    setIsLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError('');
    try {
      console.log("Google credential received:", credentialResponse);
      
      // Google authentication automatically handles both signup and login
      // - If user is new, an account is created and they're logged in
      // - If user exists, they're simply logged in
      const response = await auth.googleLogin({ token: credentialResponse.credential });
      localStorage.setItem('token', response.token);
      
      // Fetch user profile and update global state
      const userProfile = await auth.getCurrentUser();
      dispatch({ type: actionTypes.SET_USER, payload: userProfile });
      
      // No need for additional login - redirect to home
      window.location.href = '/';
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message || "Google sign-up failed");
    }
    setIsLoading(false);
  };

  return (
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
            onError={() => {
              console.error("Google Sign-Up Failed");
              setError("Google sign-up failed");
            }}
            useOneTap
            width="100%"
            text="signup_with" // Change button text to "Sign up with Google"
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
