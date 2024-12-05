import React from 'react';

export default function MCQCard({ question, choices, onSelect }) {
    return (
        <div className="rounded-[12px] px-6 py-4 max-w-[70%] bg-gray-200">
            <p className="mb-2">{question}</p>
            <div className="flex flex-col gap-2">
                {choices.map((choice, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(choice)}
                        className="text-left p-2 rounded-[6px] bg-[#D5E6EDB2] border border-[#7EB8D0] hover:bg-[#a7d2e4b2]"
                    >
                        {choice}
                    </button>
                ))}
            </div>
        </div>
    );
} 