
export default function Assignment({num, onClick}) {
    return(
        <div className="bg-slate-500 flex text-white h-64 w-64 justify-center items-center rounded-[16px]" onClick={onClick}>
            Assignment {num}
        </div>
    );
}