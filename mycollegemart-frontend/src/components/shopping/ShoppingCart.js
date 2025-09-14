import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';
import { CloseIcon, AddIcon, RemoveIcon, TrashIcon } from '../UI/Icons';

const ShoppingCart = ({ isOpen, onClose, onNavigate }) => {
  const { state, dispatch } = useGlobalState();
  const cartItems = Object.values(state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const handleIncreaseQuantity = (productId) => {
    // Block Prime Membership quantity > 1
    if (productId === 'prime-membership') {
      dispatch({
        type: actionTypes.ADD_NOTIFICATION,
        payload: { message: 'Prime Membership is limited to 1 per account.', type: 'error' }
      });
      return;
    }
    dispatch({ 
      type: actionTypes.UPDATE_CART_ITEM_QUANTITY, 
      payload: { id: productId, quantity: state.cart.items[productId].quantity + 1 }
    });
  };
  
  const handleDecreaseQuantity = (productId) => {
    const currentQuantity = state.cart.items[productId].quantity;
    if (currentQuantity === 1) {
      handleRemoveItem(productId);
    } else {
      dispatch({ 
        type: actionTypes.UPDATE_CART_ITEM_QUANTITY, 
        payload: { id: productId, quantity: currentQuantity - 1 }
      });
    }
  };
  
  const handleRemoveItem = (productId) => {
    dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: productId });
  };

  const handleCheckout = () => {
    onClose();
    onNavigate('Checkout');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      )}
      
      {/* Slide-in cart panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-slate-800 shadow-xl z-50 flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
          <h2 className="text-xl font-bold flex items-center">
            <span>Shopping Cart</span>
            {totalItems > 0 && (
              <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
            <CloseIcon />
          </button>
        </div>
        
        {totalItems === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-4">
            <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-slate-500 text-sm mt-1">Looks like you haven't added any items to your cart yet.</p>
            <button 
              onClick={() => { onClose(); onNavigate('Marketplace'); }}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4">
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 p-2 border-b dark:border-slate-700 pb-4">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md"
                      onClick={() => { onClose(); onNavigate('ProductDetail', item); }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => { onClose(); onNavigate('ProductDetail', item); }}>
                        {item.name}
                      </h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-semibold">₹{item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-1">
                        <button onClick={() => handleDecreaseQuantity(item.id)} className="p-1 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600">
                          <RemoveIcon />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button 
                          onClick={() => handleIncreaseQuantity(item.id)}
                          className={`p-1 rounded-full ${item.id === 'prime-membership' ? 'bg-slate-200 dark:bg-slate-700 cursor-not-allowed opacity-60' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                          disabled={item.id === 'prime-membership'}
                        >
                          <AddIcon />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveItem(item.id)} className="p-1 text-slate-500 hover:text-red-500">
                      <TrashIcon />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t dark:border-slate-700 p-4 space-y-4">
              <div className="flex justify-between font-medium">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="text-xs text-slate-500">
                Delivery fees & taxes calculated at checkout
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
              >
                Checkout
              </button>
              <button 
                onClick={onClose} 
                className="w-full py-2 text-indigo-600 dark:text-indigo-400 font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default ShoppingCart;
