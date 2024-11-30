import { useState } from "react";

export default function Assignment({num, title, dueDate, dueTime, submitted, onClick}) {

    return(
        <div className="bg-white flex justify-between px-7 py-6 rounded-[16px] shadow-custom border border-[#B8B7AF] hover:shadow-[#1F8FBF] hover:border-[#1F8FBF]" onClick={onClick}>
            <div className=" text-black w-auto flex flex-col justify-center">
                <div className="text-3xl">
                    {title}
                </div>
                <div className="text-xl text-[#B1B1B1]">
                    Due: {dueDate} | {dueTime}
                </div>
            </div>
            <div className={`${submitted ? 'bg-[#E4F6D9] border-[#648153]' : 'bg-white border-[#B1B1B1]'} flex justify-center items-center border rounded-[6px] w-auto h-5 text-lg px-4 py-4`}
            >
                {submitted ? "Submitted" : "Not submitted"}
            </div>
        </div>
    );
}