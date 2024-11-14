import Student from './Student';

export default function StudentList() {
    return(
        <div className="h-screen w-[30%] text-black border-2 rounded-[12px] border-[#D7D7D7] bg-[#FFF] px-9 py-6 flex flex-col justify-between text-lg">
            <Student />
        </div>
    );
}