import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';
import { CloseIcon } from '../UI/Icons';

const Notification = ({ message, type, onDismiss }) => {
  const bgColor = type === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900';
  const textColor = type === 'success' ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`p-4 mb-4 rounded-lg shadow-lg border-l-4 ${borderColor} ${bgColor} ${textColor} flex justify-between items-center`}
    >
      <span className="break-words">{message}</span>
      <button onClick={onDismiss} className="ml-4 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
        <CloseIcon />
      </button>
    </motion.div>
  );
};

const NotificationHost = () => {
  const { state, dispatch } = useGlobalState();
  const { notifications } = state;
  
  const handleDismiss = (id) => {
    dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id });
  };

  return createPortal(
    <div className="fixed top-5 right-5 z-[9999] w-80">
      {notifications.map(n => (
        <Notification key={n.id} {...n} onDismiss={() => handleDismiss(n.id)} />
      ))}
    </div>,
    document.body
  );
};

export default NotificationHost;
