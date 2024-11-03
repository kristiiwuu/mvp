export default function ProblemNumber({ num, selected, onClick}) {
    return (
        <div onClick={onClick}
            className={`w-12 h-12 rounded-[8px] flex justify-center items-center 
            ${selected ? 'text-white bg-[#1F8FBF]' : 'text-black bg-[#FFF] hover:bg-[#1F8FBF] hover:text-white'}`}>
            {num}
        </div>
    );
}