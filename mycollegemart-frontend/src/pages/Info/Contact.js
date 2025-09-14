import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '../../components/UI/Icons';

const Contact = () => {
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'sent'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    await new Promise(res => setTimeout(res, 1500));
    setStatus('sent');
  };

  return (
    <div className="min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Get In Touch</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            We're here to help. Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>
       
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 text-slate-600 dark:text-slate-300"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="flex items-start space-x-4 p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.svg 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mt-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </motion.svg>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Email Us</h3>
                <p>For general inquiries or support, drop us an email.</p>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:kudkartanmay25@gmail.com" 
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium mt-1 inline-block"
                >
                  kudkartanmay25@gmail.com
                </motion.a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="flex items-start space-x-4 p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.svg 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6, type: "spring", stiffness: 200 }}
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mt-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </motion.svg>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Call Us</h3>
                <p>Our support line is open on weekdays from 9am to 5pm.</p>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+918104970317" 
                  className="font-bold text-lg text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center mt-2 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full"
                >
                  <span className="tracking-wider">+91 8104 970 317</span>
                </motion.a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="flex items-start space-x-4 p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.svg 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7, type: "spring", stiffness: 200 }}
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mt-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </motion.svg>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Our Campus Office</h3>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="mt-2 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-700 dark:to-indigo-900/30 p-3 rounded-lg border-l-4 border-indigo-500"
                >
                  <p className="font-medium">Vidyavardhini's College of Engineering & Technology</p>
                  <p className="text-indigo-700 dark:text-indigo-300 font-medium">K.T. Marg, Vasai Station Rd, Vishal Nagar,</p>
                  <p className="text-indigo-700 dark:text-indigo-300 font-medium">Vasai West, Maharashtra 401202</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg transition-all duration-300"
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="text-center py-10 flex flex-col items-center justify-center h-full"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                >
                  <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-2xl font-bold text-slate-900 dark:text-white"
                >
                  Message Sent!
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-2 text-slate-600 dark:text-slate-300"
                >
                  Thanks for reaching out. We'll get back to you soon.
                </motion.p>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }}
                    type="text" 
                    id="name" 
                    required 
                    className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }}
                    type="email" 
                    id="email" 
                    required 
                    className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                    <motion.textarea 
                                      whileFocus={{ scale: 1.02 }}
                                      id="message" 
                                      rows="4" 
                                      required 
                                      className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                    />
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                  >
                                    <motion.button
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.97 }}
                                      type="submit"
                                      disabled={status === 'sending'}
                                      className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                      {status === 'sending' ? 'Sending...' : 'Send Message'}
                                    </motion.button>
                                  </motion.div>
                                </motion.form>
                              )}
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    );
                  };
                  
                  export default Contact;
