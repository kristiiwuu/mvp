"use client"
import Assignment from './Assignment';
import { useRouter } from 'next/navigation';


export default function Assignments() {

    const router = useRouter();

    const handleClick = (num) => {
        router.push(`/assignment/${num}`);
    }

    const assignments = [{
        title: "Symbiosis HW",
        dueDate: "November 6, 2024",
        dueTime: "11:59 PM",
        submitted: true
    }, {
        title: "States of Matter HW",
        dueDate: "November 6, 2024",
        dueTime: "11:59 PM",
        submitted: true
    },{
        title: "Water Cycle HW",
        dueDate: "November 6, 2024",
        dueTime: "11:59 PM",
        submitted: false
    }];

    return(
        <div className="w-[50%] h-auto text-[#80817B] text-3xl flex-grow">
            <div className="flex flex-col flex-wrap gap-5">
                {assignments.map((assignment, index) => {
                    const { title, dueDate, dueTime, submitted } = assignment;
                    return <Assignment num={index + 1} title={title} dueDate={dueDate} dueTime={dueTime} submitted={submitted} onClick={() => handleClick(index + 1)}/>
                })}
            </div>
        </div>
    );
}