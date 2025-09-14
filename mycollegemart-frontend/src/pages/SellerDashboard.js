import { motion } from 'framer-motion';

const stats = [
  {
    label: "Total Sales",
    value: "₹12,500",
    icon: "💰",
    color: "from-green-400 to-green-600"
  },
  {
    label: "Active Listings",
    value: "8",
    icon: "📦",
    color: "from-indigo-400 to-indigo-600"
  },
  {
    label: "Seller Rating",
    value: "4.9/5",
    icon: "⭐",
    color: "from-yellow-400 to-amber-500"
  }
];

const SellerDashboard = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 py-12 px-2">
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-4xl w-full bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-2xl p-8 relative overflow-hidden"
    >
      {/* Animated accent bar */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'loop' }}
        style={{ backgroundSize: '200% 100%' }}
      />
      {/* Animated icon and title */}
      <div className="flex items-center mb-6">
        <span className="relative mr-3">
          <span className="absolute inset-0 rounded-full bg-indigo-400 blur-xl opacity-30 animate-pulse" />
          <motion.span
            className="text-3xl z-10 relative"
            animate={{ rotate: [0, -10, 0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 6 }}
          >📈</motion.span>
        </span>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900 dark:text-white"
        >
          Seller Dashboard
        </motion.h1>
      </div>
      {/* Animated stats row */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            className={`relative bg-gradient-to-br ${stat.color} rounded-xl p-5 text-center shadow-md overflow-hidden`}
          >
            <span className="absolute -top-4 -right-4 text-5xl opacity-10 pointer-events-none select-none">{stat.icon}</span>
            <div className="text-slate-100 text-xs mb-1 tracking-wide uppercase font-semibold drop-shadow">{stat.label}</div>
            <div className="text-3xl font-extrabold text-white drop-shadow">{stat.value}</div>
          </motion.div>
        ))}
      </motion.div>
      {/* Manage Listings section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white flex items-center gap-2">
          <span className="animate-bounce text-indigo-500">📝</span>
          Manage Your Listings
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          View, edit, or remove your active listings. Track your sales and see your performance as a campus seller.
        </p>
        <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-1">
          <li>Click <b>Sell Item</b> to add a new product.</li>
          <li>Edit or delete your listings as needed.</li>
          <li>Respond promptly to buyer messages for better ratings.</li>
        </ul>
        <div className="mt-6 text-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
            disabled
          >
            <span className="animate-spin">⏳</span>
            Listings management coming soon!
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

export default SellerDashboard;
