import React, { useState } from 'react';
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
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 flex flex-col items-center justify-center h-full"
              >
                <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
                <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Thanks for reaching out. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
                  <input type="text" id="name" required className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <input type="email" id="email" required className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                  <textarea id="message" rows="4" required className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                <div>
                  <button 
                    type="submit" 
                    disabled={status === 'sending'} 
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center disabled:bg-indigo-400"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="space-y-8 text-slate-600 dark:text-slate-300">
            <div className="flex items-start space-x-4 p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Email Us</h3>
                <p>For general inquiries or support, drop us an email.</p>
                <a href="mailto:kudkartanmay25@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium mt-1 inline-block">
                  kudkartanmay25@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Call Us</h3>
                <p>Our support line is open on weekdays from 9am to 5pm.</p>
                <a href="tel:+918104970317" className="font-bold text-lg text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center mt-2 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full">
                  <span className="tracking-wider">+91 8104 970 317</span>
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Our Campus Office</h3>
                <div className="mt-2 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-700 dark:to-indigo-900/30 p-3 rounded-lg border-l-4 border-indigo-500">
                  <p className="font-medium">Vidyavardhini's College of Engineering & Technology</p>
                  <p className="text-indigo-700 dark:text-indigo-300 font-medium">K.T. Marg, Vasai Station Rd, Vishal Nagar,</p>
                  <p className="text-indigo-700 dark:text-indigo-300 font-medium">Vasai West, Maharashtra 401202</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
