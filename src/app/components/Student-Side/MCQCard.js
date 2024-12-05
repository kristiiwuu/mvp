import React from 'react';

export default function MCQCard({ question, choices, onSelect }) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
            <p className="font-medium mb-3">{question}</p>
            <div className="flex flex-col gap-2">
                {choices.map((choice, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(choice)}
                        className="text-left p-2 rounded-md hover:bg-blue-50 border border-gray-200"
                    >
                        {choice}
                    </button>
                ))}
            </div>
        </div>
    );
} 