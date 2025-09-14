import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';

const AuthForm = ({ isLogin, onNavigate }) => {
  const { dispatch } = useGlobalState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const authFn = isLogin 
        ? mockFirebase.auth.signInWithEmailAndPassword
        : mockFirebase.auth.createUserWithEmailAndPassword;
      
      await authFn(email, password);
      dispatch({
        type: actionTypes.ADD_NOTIFICATION,
        payload: { message: `Successfully ${isLogin ? 'logged in' : 'signed up'}!`, type: 'success' }
      });
      onNavigate('Home');
    } catch (err) {
      setError(err.message || "An error occurred.");
      dispatch({
        type: actionTypes.ADD_NOTIFICATION,
        payload: { message: err.message || "An error occurred.", type: 'error' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div>
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg disabled:bg-indigo-300"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-slate-600 dark:text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a 
            href="#" 
            onClick={() => onNavigate(isLogin ? 'Signup' : 'Login')} 
            className="font-medium text-indigo-600 hover:underline"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
