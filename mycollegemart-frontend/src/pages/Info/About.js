import React from 'react';
import { motion } from 'framer-motion';

const About = ({ onNavigate }) => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  // Shimmer animation for button
  const buttonVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: 1,
    },
    tap: { scale: 0.97 }
  };

  return (
    <div className="min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-4xl font-extrabold text-slate-900 dark:text-white"
          >
            About MyCollegeMart
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-4 text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto"
          >
            Empowering students to buy, sell, and connect through a trusted campus marketplace that makes college life more affordable and sustainable.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              We understand the financial pressures of college life. Our mission is to create a trusted, 
              easy-to-use marketplace where you can buy and sell college essentials directly with your peers, 
              saving money and making a little extra cash on the side.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              MyCollegeMart bridges the gap between students who need affordable resources and those 
              looking to monetize their unused items, creating a sustainable campus economy.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.03, transition: { duration: 0.1 } }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80" 
              alt="College students on campus" 
              className="rounded-2xl shadow-lg" 
            />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Core Values</h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.1 } }}
              className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg"
            >
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">For Students, By Students</h3>
                <p className="text-slate-700 dark:text-slate-300">A community-driven platform where students connect, trade, and support each other's academic journey.</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.1 } }}
              className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg"
            >
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Smart Savings</h3>
                <p className="text-slate-700 dark:text-slate-300">Find affordable textbooks, electronics, and essentials while earning money from items you no longer need.</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.1 } }}
              className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg"
            >
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Campus Sustainability</h3>
                <p className="text-slate-700 dark:text-slate-300">Reduce waste and promote environmental responsibility by giving your college items a second life.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Discover amazing deals, connect with fellow students, and make your college experience more affordable and sustainable.
          </p>
          <div className="inline-block relative">
            <motion.button 
              onClick={() => onNavigate('Marketplace')}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileTap="tap"
              whileHover={{ scale: 1.02 }}
              className="relative z-10 px-10 py-4 bg-gradient-to-r from-indigo-700 to-purple-800 text-white font-bold rounded-full shadow-lg text-lg transform-gpu overflow-hidden"
            >
              <span className="relative z-10">Explore Marketplace</span>
              
              {/* Continuous shimmer effect without delay */}
              <motion.span 
                className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white to-transparent"
                style={{ opacity: 0.2 }}
                animate={{
                  x: ["calc(-100%)", "calc(100%)"]
                }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            </motion.button>
            
            {/* Smoother pulsing glow */}
            <motion.div 
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              style={{ filter: "blur(8px)" }}
              animate={{
                opacity: [0.6, 0.8, 0.6],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Why Choose MyCollegeMart?</h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: "🛡️", title: "Secure Transactions", desc: "Safe and verified student-to-student exchanges" },
              { icon: "📱", title: "Easy to Use", desc: "Intuitive interface designed for busy students" },
              { icon: "🏫", title: "Campus Focused", desc: "Dedicated to your college community" },
              { icon: "💡", title: "Smart Features", desc: "AI-powered recommendations and search" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.1 } }}
                className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
                  className="text-4xl mb-3"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default About;
