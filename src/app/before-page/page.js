"use client"
import Header from '../components/Before-Page/Header';
import AssignmentCard from '../components/Before-Page/AssignmentCard'
import { useSearchParams } from 'next/navigation'


export default function StudentPortal() {

    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const dueDate = searchParams.get('dueDate');
    const dueTime = searchParams.get('dueTime');
    const startDate = searchParams.get('startDate');
    const startTime = searchParams.get('startTime');
    const endDate = searchParams.get('endDate');
    const endTime = searchParams.get('endTime');
    const submitted = searchParams.get('submitted') === "true";
    const num = searchParams.get('num');



    return(
        <div className="font-orienta w-auto bg-[#F8F7F4] h-screen flex flex-col pb-12 items-center gap-10">
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
                num={num}
            />
        </div>
    );
}