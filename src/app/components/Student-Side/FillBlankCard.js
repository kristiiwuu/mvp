import React, { useState } from 'react';

export default function FillBlankCard({ question, answer, onSubmit }) {
    const [userAnswer, setUserAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(userAnswer);
        setUserAnswer('');
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
            <p className="font-medium mb-3">{question}</p>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    className="flex-grow border-2 rounded-[12px] p-2 border-[#D7D7D7]"
                />
                <button 
                    type="submit"
                    className="bg-[#1F8FBF] hover:bg-[#58B6DF] text-white px-4 py-2 rounded-[12px]"
                >
                    Submit
                </button>
            </form>
        </div>
    );
} 