"use client"
import Assignment from './Assignment';
import { useRouter } from 'next/navigation';


export default function Assignments() {

    const router = useRouter();

    const handleClick = (title, dueDate, dueTime, startDate, startTime, endDate, endTime, submitted, started, index) => {
        router.push(`/before-page?title=${encodeURIComponent(title)}&dueDate=${encodeURIComponent(dueDate)}&dueTime=
        ${encodeURIComponent(dueTime)}&startDate=${encodeURIComponent(startDate)}&startTime=${encodeURIComponent(startTime)}&endDate=
        ${encodeURIComponent(endDate)}&endTime=${encodeURIComponent(endTime)}&submitted=${encodeURIComponent(submitted)}&started=${encodeURIComponent(started)}&num=${encodeURIComponent(index+1)}`);
    }

    const assignments = [{
        title: "Symbiosis HW",
        dueDate: "November 6, 2024",
        dueTime: "11:59 PM",
        startDate: "November 1",
        startTime: "12:00 AM",
        endDate: "November 15",
        endTime: "11:59 PM",
        submitted: true,
        started: true
    }, {
        title: "States of Matter HW",
        dueDate: "December 10, 2024",
        dueTime: "11:59 PM",
        startDate: "November 1",
        startTime: "12:00 AM",
        endDate: "November 15",
        endTime: "11:59 PM",
        submitted: false,
        started: false

    },{
        title: "Water Cycle HW",
        dueDate: "December 10, 2024",
        dueTime: "11:59 PM",
        startDate: "November 1",
        startTime: "12:00 AM",
        endDate: "November 15",
        endTime: "11:59 PM",
        submitted: false,
        started: false
    }];

    return(
        <div className="w-[50%] h-auto text-[#80817B] text-3xl flex-grow">
            <div className="flex flex-col flex-wrap gap-5">
                {assignments.map((assignment, index) => {
                    const { title, dueDate, dueTime, submitted, startDate, startTime, endDate, endTime } = assignment;
                    return <Assignment key={index} num={index + 1} title={title} dueDate={dueDate} dueTime={dueTime} startDate={startDate} startTime={startTime} endDate={endDate} endTime={endTime} submitted={submitted} started={started}
                    onClick={() => handleClick(title, dueDate, dueTime, startDate, startTime, endDate, endTime, submitted, started, index)}/>
                })}
            </div>
        </div>
    );
}