import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';

const Notification = ({ notification, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(notification.id), 2500); // faster auto-dismiss
    return () => clearTimeout(timer);
  }, [notification.id, onRemove]);

  const isSuccess = notification.type === 'success';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      className={`relative flex items-start p-4 mb-3 rounded-lg shadow-lg text-white ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}
    >
      <div className="flex-1 pr-6">
        <p className="font-bold">{isSuccess ? 'Success' : 'Error'}</p>
        <p className="text-sm">{notification.message}</p>
      </div>
      <button onClick={() => onRemove(notification.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20" aria-label="Close">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" /></svg>
      </button>
    </motion.div>
  );
};

const NotificationContainer = () => {
  const { state, dispatch } = useGlobalState();
  const { notifications } = state;

  const removeNotification = (id) => {
    dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id });
  };

  // De-duplicate by type+message and show only the latest 3
  const deduped = [];
  const seen = new Set();
  for (const n of notifications) {
    const key = `${n.type}:${n.message}`;
    if (!seen.has(key)) {
      deduped.push(n);
      seen.add(key);
    }
  }
  const toShow = deduped.slice(-3); // last 3 only

  return (
    <div className="fixed top-5 right-5 z-[100] w-full max-w-sm">
      <AnimatePresence initial={false}>
        {toShow.map(n => (
          <Notification key={n.id} notification={n} onRemove={removeNotification} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
