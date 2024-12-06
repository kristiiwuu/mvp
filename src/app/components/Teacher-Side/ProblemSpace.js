import PlusSign from 'public/plus.svg'
import Task from './Task'
import { useRouter } from 'next/navigation'

export default function ProblemSpace() {
    const router = useRouter();

    const handleGenerateHomework = () => {
        router.push('/pdf-parser');
      };


    const assignments= [{
        title:"Symbiosis HW",
        dueDate: "December 6, 2024",
        dueTime: "11:59 PM",
        assignedDate: "December 1, 2024",
        submissions: 20,
        total: 30
    },
    {
        title:"States of Matter HW",
        dueDate: "December 6, 2024",
        dueTime: "11:59 PM",
        assignedDate: "December 1, 2024",
        submissions: 14,
        total: 30
    },
    {
        title:"Water Cycle HW",
        dueDate: "December 6, 2024",
        dueTime: "11:59 PM",
        assignedDate: "December 1, 2024",
        submissions: 7,
        total: 30
    }]

    return(
        <div className="min-h-screen w-[70%] text-black border-2 rounded-[6px] bg-[#FFF] border-[#D7D7D7] px-9 py-6 flex flex-col max-h-screen gap-5">
            <button className="text flex justify-center items-center gap-2 px-6 py-4 hover:bg-[#58B6DF] bg-[#1F8FBF] text-white w-[150px] h-[9%] rounded-[6px]"
            onClick={handleGenerateHomework}>
                <PlusSign />
                New
            </button>
            <div className="flex flex-col gap-5">
                {assignments.map((assignment, num)=> {
                    return <Task key={num} title={assignment.title} dueDate={assignment.dueDate} dueTime={assignment.dueTime} assignedDate={assignment.assignedDate} submissions={assignment.submissions} total={assignment.total}/>
                })}
            </div>
        </div>
       
    );
}