import React from 'react';
import { motion } from 'framer-motion';

const PlaceholderPage = ({ title, children }) => (
    <div className="min-h-[60vh] py-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg"
        >
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">{title}</h1>
            <div className="prose dark:prose-invert max-w-none">
                {children}
            </div>
        </motion.div>
    </div>
);

export default PlaceholderPage;
