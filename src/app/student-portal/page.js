"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Assignment from '../components/Student-Side/Assignment';

export default function StudentPortal() {
    const router = useRouter();

    const handleClick = (num) => {
        router.push(`/assignment/${num}`);
    }

    const assignments = [1,2,3];

    return(
        <div className="font-orienta h-screen bg-[#F8F7F4] px-12 pt-10 pb-12 flex flex-wrap gap-5">
            {assignments.map((num)=> {
                return <Assignment num={num} onClick={()=> handleClick(num)}/>
            })}
        </div>
    );
}