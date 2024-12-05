import React from 'react';

export default function FillBlankCard({ question }) {
    return (
        <div className="rounded-[12px] px-6 py-3 m-0 max-w-[70%] bg-gray-200">
            <p className="">{question}</p>
        </div>
    );
} 