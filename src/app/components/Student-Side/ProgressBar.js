import React from 'react';

export default function ProgressBar({ progress }) {
    // Ensure progress is between 0 and 100
    const clampedProgress = Math.min(100, Math.max(0, progress));
    
    return (
        <div className="w-full mt-0">
            <div className="w-full h-2 bg-gray-200 rounded-full">
                <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out ${clampedProgress > 80 ? 'bg-[#79d38d]' : 'bg-[#1F8FBF]'}`}
                    style={{ width: `${clampedProgress}%` }}
                />
            </div>
            <div className="text-sm text-gray-500 mt-1 text-right">
                Progress: {Math.round(clampedProgress)}%
            </div>
        </div>
    );
} 