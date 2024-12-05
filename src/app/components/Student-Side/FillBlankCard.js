import React from 'react';

export default function FillBlankCard({ question }) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
            <p className="font-medium mb-3">{question}</p>
        </div>
    );
} 