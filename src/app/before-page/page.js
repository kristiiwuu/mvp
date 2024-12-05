"use client"
import React from 'react';
import Header from '../components/Before-Page/Header';
import AssignmentCard from '../components/Before-Page/AssignmentCard'
import { useSearchParams } from 'next/navigation'


export default function StudentPortal() {

    return(
        <React.Suspense fallback={<div>Loading...</div>}>
            <SearchParamsWrapper />
        </React.Suspense>
    );

    function SearchParamsWrapper() {
        const searchParams = useSearchParams();
        const title = searchParams.get('title');
        const dueDate = searchParams.get('dueDate');
        const dueTime = searchParams.get('dueTime');
        const startDate = searchParams.get('startDate');
        const startTime = searchParams.get('startTime');
        const endDate = searchParams.get('endDate');
        const endTime = searchParams.get('endTime');
        const submitted = searchParams.get('submitted') === "true";
        const started = searchParams.get('started') === "true";
        const num = searchParams.get('num');
    
        return (
            <div className="w-auto bg-[#F8F7F4] h-screen flex flex-col pb-12 items-center gap-10">
                <Header title={title}/>
                <AssignmentCard 
                    title={title} 
                    dueDate={dueDate} 
                    dueTime={dueTime} 
                    startDate={startDate} 
                    startTime={startTime} 
                    endDate={endDate} 
                    endTime={endTime} 
                    submitted={submitted} 
                    started={started}
                    num={num}
                />
            </div>
        );
    }

    // return(
    //     <React.Suspense fallback={<div>Loading...</div>}>
    //         <div className="w-auto bg-[#F8F7F4] h-screen flex flex-col pb-12 items-center gap-10">
    //             <Header title={title}/>
    //             <AssignmentCard 
    //                 title={title} 
    //                 dueDate={dueDate} 
    //                 dueTime={dueTime} 
    //                 startDate={startDate} 
    //                 startTime={startTime} 
    //                 endDate={endDate} 
    //                 endTime={endTime} 
    //                 submitted={submitted} 
    //                 num={num}
    //             />
    //         </div>
    //     </React.Suspense>
    // );
}