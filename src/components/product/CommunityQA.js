import React, { useState } from 'react';

const CommunityQA = ({ questions }) => {
    const [newQuestion, setNewQuestion] = useState("");

    const handleAsk = (e) => {
        e.preventDefault();
        if (newQuestion.trim()) {
            // In a real app, this would submit the question to a backend.
            console.log("New Question:", newQuestion);
            // Reset the input field after asking
            setNewQuestion("");
            // You could also add the question to the UI immediately for better UX
            // by passing a function to add questions from the parent component
        }
    };

    return (
        <div className="mt-12">
            <h3 className="text-lg font-bold mb-4">Community Q&amp;A</h3>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700">
                <div className="p-4">
                    <form onSubmit={handleAsk} className="flex items-center gap-2">
                        <input 
                            type="text" 
                            value={newQuestion}
                            onChange={e => setNewQuestion(e.target.value)}
                            placeholder="Ask a question about this item..." 
                            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none"
                        />
                        <button 
                            type="submit" 
                            disabled={!newQuestion.trim()}
                            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                        >
                            Ask
                        </button>
                    </form>
                </div>
                
                {questions && questions.length > 0 ? (
                    <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-3">
                        {questions.map(q => (
                            <div key={q.id} className="mb-4 last:mb-0">
                                <p className="font-medium">
                                    <span className="text-indigo-600 dark:text-indigo-400 mr-1">Q:</span>
                                    {q.question} 
                                    <span className="text-sm font-normal text-slate-500 ml-1">- {q.author}</span>
                                </p>
                                {q.answers && q.answers.map((a, i) => (
                                    <p key={i} className="mt-1 ml-4 text-slate-600 dark:text-slate-300">
                                        <span className="font-medium text-green-600 dark:text-green-400 mr-1">A:</span>
                                        {a.text} 
                                        <span className="text-sm font-normal text-slate-500 ml-1">- {a.author}</span>
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-3 text-center text-slate-500">
                        Be the first to ask a question!
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommunityQA;
