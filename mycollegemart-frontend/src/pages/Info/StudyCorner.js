import React, { useState, useRef, useEffect } from 'react';
import PlaceholderPage from '../../components/common/PlaceholderPage';

const StudyCorner = () => {
  const [chatHistory, setChatHistory] = useState([{
    role: 'bot',
    text: "Hey! I'm your AI Study Planner. To get started, tell me your subject, exam date, and how many hours a week you can study. For example: 'Calculus I, Dec 15th, 10 hours'."
  }]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = { role: 'user', text: userInput };
    const newChatHistory = [...chatHistory, newUserMessage];
    setChatHistory(newChatHistory);
    setUserInput('');
    setIsLoading(true);

    // Mock AI response
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          role: 'bot', 
          text: "That sounds like a good plan! I recommend breaking down your study sessions into 25-minute focused periods with 5-minute breaks. Make sure to review key concepts each week and practice with past exam questions. Would you like me to create a detailed weekly schedule?" 
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <PlaceholderPage title="🎓 AI Study Corner">
      <div className="text-lg mb-6">Chat with our AI planner to create a custom study schedule to help you ace your tests.</div>
      <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg h-[60vh] flex flex-col">
        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-md p-3 rounded-lg ${msg.role === 'bot' ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200' : 'bg-indigo-500 text-white'}`}>
                <div className="prose dark:prose-invert prose-p:my-1" dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-md p-3 rounded-lg bg-white dark:bg-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
          <input 
            type="text" 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..." 
            className="flex-grow px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg disabled:bg-indigo-400">
            Send
          </button>
        </form>
      </div>
    </PlaceholderPage>
  );
};

export default StudyCorner;
