import ProblemNumber from "./ProblemNumber";
import { useState } from 'react';

export default function NavBar({handleClick, selectedNum}) {
    return (
        <div className="w-21 h-screen border-2 rounded-[12px] border-[#D7D7D7] bg-[#FFF] text-black px-4 py-6 flex flex-col justify-between gap-2">
            <ProblemNumber num={1} selected={selectedNum === 1} onClick={() => handleClick(1)}/>
            <ProblemNumber num={2} selected={selectedNum === 2} onClick={() => handleClick(2)}/>
            <ProblemNumber num={3} selected={selectedNum === 3} onClick={() => handleClick(3)}/>
            <ProblemNumber num={4} selected={selectedNum === 4} onClick={() => handleClick(4)}/>
            <ProblemNumber num={5} selected={selectedNum === 5} onClick={() => handleClick(5)}/>
            <ProblemNumber num={6} selected={selectedNum === 6} onClick={() => handleClick(6)}/>
            <ProblemNumber num={7} selected={selectedNum === 7} onClick={() => handleClick(7)}/>
            <ProblemNumber num={8} selected={selectedNum === 8} onClick={() => handleClick(8)}/>
            <ProblemNumber num={9} selected={selectedNum === 9} onClick={() => handleClick(9)}/>
            <ProblemNumber num={10} selected={selectedNum === 10} onClick={() => handleClick(10)}/>
        </div>
    );
}