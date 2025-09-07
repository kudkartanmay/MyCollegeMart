import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';
import { CloseIcon, RemoveIcon, AddIcon, TrashIcon, ArrowRightIcon } from '../UI/Icons';

const CartDrawer = ({ isOpen, onClose, onNavigate }) => {
  const { state, dispatch } = useGlobalState();
  const cartItems = Object.values(state.cart.items);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  if (!isOpen) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-40"
    >
      <motion.div
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Your Cart</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
            <CloseIcon />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6 text-slate-500 dark:text-slate-400">
            <ShoppingCartIcon className="w-20 h-20 mb-4 text-slate-400" />
            <h3 className="text-2xl font-semibold">Your cart is feeling lonely</h3>
            <p className="mt-2">Add some items to get started!</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-4">
            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
              {cartItems.map(item => (
                <motion.li 
                  layout
                  key={item.id} 
                  className="flex items-center space-x-4 py-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-md object-cover"/>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-slate-800 dark:text-white">{item.name}</h4>
                    <p className="text-slate-600 dark:text-slate-400">₹{item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => dispatch({type: actionTypes.DECREASE_QUANTITY, payload: item.id})} className="p-1 border rounded-md dark:border-slate-600"><RemoveIcon /></button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button onClick={() => dispatch({type: actionTypes.ADD_TO_CART, payload: item})} className="p-1 border rounded-md dark:border-slate-600"><AddIcon /></button>
                    </div>
                  </div>
                  <button onClick={() => dispatch({type: actionTypes.REMOVE_FROM_CART, payload: item.id})} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"><TrashIcon /></button>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
        
        {cartItems.length > 0 && (
          <div className="p-6 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span className="text-slate-800 dark:text-white">Subtotal</span>
              <span className="text-indigo-600 dark:text-indigo-400">₹{cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                onNavigate('Checkout');
                onClose();
              }}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Proceed to Checkout <ArrowRightIcon/>
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
};

// Helper function to avoid the undefined ShoppingCartIcon error
function ShoppingCartIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

export default CartDrawer;
