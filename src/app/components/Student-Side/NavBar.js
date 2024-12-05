import ProblemNumber from "./ProblemNumber";
import { useState } from 'react';

export default function NavBar({handleClick, selectedNum, isCorrectArray, startedArray}) {
    return (
        <div className="w-21 h-auto pr-4 flex flex-col justify-between gap-2">
            {Array.from({ length: 10 }, (_, index) => (
                <ProblemNumber 
                    key={index + 1} 
                    num={index + 1} 
                    selected={selectedNum === index + 1} 
                    onClick={() => handleClick(index + 1)} 
                    isCorrect={isCorrectArray[index]}
                    isStarted={startedArray[index]}
                />
                
            ))}
        </div>
    );
}