import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const StudyCorner = () => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hey! I'm your AI Study Planner. To get started, tell me your subject, exam date, and how many hours a week you can study. For example: 'Calculus I, Dec 15th, 10 hours'."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simple AI response for demo
  const getBotResponse = (msg) => {
    if (/calculus|math|physics|chemistry|subject/i.test(msg)) {
      return "Great! Please provide your exam date and how many hours per week you can dedicate to this subject.";
    }
    if (/(\d{1,2}\s*hours?)/i.test(msg) && /(\d{1,2}(st|nd|rd|th)?\s*\w+)/i.test(msg)) {
      return "Here's a sample study plan:\n- Break your study hours into daily sessions\n- Focus on weak topics first\n- Take regular breaks\n- Review before the exam\n\nWant a detailed schedule? This feature is coming soon!";
    }
    return "Tell me your subject, exam date, and available study hours per week. I'll help you plan!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages([...newMessages, { role: 'bot', text: getBotResponse(input) }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-10 px-2">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">🎓</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">AI Study Corner</h1>
        </div>
        <p className="mb-4 text-slate-600 dark:text-slate-300">
          Chat with our AI planner to create a custom study schedule to help you ace your tests.
        </p>
        <div className="bg-slate-50 dark:bg-slate-700/40 rounded-lg p-4 mb-4 min-h-[56px]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
              }`}>
                {msg.text}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="text-left">
              <span className="inline-block px-3 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white opacity-70">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-bounce mr-1"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-bounce mr-1" style={{ animationDelay: '0.2s' }}></span>
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            disabled={!input.trim()}
          >
            Send
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default StudyCorner;
