import { useRouter } from 'next/navigation';

export default function AssignmentCard({ title, dueDate, dueTime, startDate, startTime, endDate, endTime, submitted, num}) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/assignment/${num}`);
    }
    
    return(
        <div className="text-black p-10 fixed mt-[150px] h-[250px] w-[550px] bg-[#FFF] shadow-custom border border-[#B8B7AF] rounded-[6px] flex flex-col justify-center">
            <div className="text-2xl">{title}</div>
            <div className="text-[#787878] mt-2">Due: {dueDate} | {dueTime}</div>
            <div className="text-[#787878]">Available: {startDate} | {startTime} - {endDate} | {endTime}</div>
            {submitted ?  
            <button className="mt-5 flex w-[200px] px-2 py-2 justify-center items-center bg-[#1F8FBF] text-white rounded-[6px] hover:bg-[#58B6DF]" onClick={handleClick}>Start Assignment</button> : 
            <button className="mt-5 flex w-[200px] px-2 py-2 justify-center items-center bg-[#1F8FBF] text-white rounded-[6px] hover:bg-[#58B6DF]"  onClick={handleClick}>Continue Assignment</button>}
        </div>
    );
}