export default function Task({title, dueDate, dueTime, assignedDate, submissions, total}) {

    return(
        <div className="bg-white flex justify-between px-7 py-6 rounded-[6px] shadow-custom border border-[#B8B7AF] hover:shadow-[#1F8FBF] hover:border-[#1F8FBF] group">
            <div className=" text-black w-auto flex flex-col justify-center">
                <div className="font-semibold text-3xl group-hover:underline">
                    {title}
                </div>
                <div className="mt-2 text-xl text-[#B1B1B1] group-hover:no-underline flex gap-6">
                    <p>Due: {dueDate} | {dueTime}</p>
                    <p>Assigned: {assignedDate}</p>
                </div>
                <div className="mt-1 text-xl flex gap-2">
                    Submissions:
                    <div className={`bg-[#1F8FBF40] px-2 rounded-[6px]`}><strong>{submissions}</strong>/{total}</div>
                    {/* <div className={`${ submissions / total > 0.5? "bg-[#1F8FBF40]": submissions/total > 0.25 ?"bg-[#EBD168]" : "bg-[#D07EA6]"}  px-2 rounded-[6px]`}><strong>{submissions}</strong>/{total}</div> */}
                </div>
            </div>
        </div>
    );
}