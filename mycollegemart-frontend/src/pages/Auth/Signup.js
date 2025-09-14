import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleIcon } from '../../components/UI/Icons';

const Signup = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ...existing logic...

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Create account</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 font-medium shadow-sm border border-amber-400"
          >
            Create Account
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
        <button
          onClick={() => console.log("Google Sign-Up clicked")}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800"
        >
          <GoogleIcon />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Sign up with Google</span>
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <button onClick={() => onNavigate('Login')} className="text-blue-600 dark:text-blue-400 hover:underline">Sign in</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
