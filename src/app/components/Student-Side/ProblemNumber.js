export default function ProblemNumber({ num, selected, onClick, isCorrect, isStarted }) {

    isCorrect = false;
    return (
        <div 
            onClick={onClick} 
            className={` border border-[#1F8FBF] text-[#1F8FBF] w-12 h-12 rounded-[50%] flex justify-center items-center relative 
                ${isCorrect ? 'text-[white] bg-[#1F8FBF] hover:bg-[#58B6DF]' : selected ? 'text-[#1F8FBF] hover:bg-[#58B6DF]' : 
                    isStarted? 'text-[#1F8FBF] hover:bg-[#58B6DF] hover:text-white' : 'text-[#B8B7AF] border-none hover:bg-[#1F8FBF]'}`}>
            {num}
            {selected && (
                <div className="w-9 h-9 rounded-[50%] border border-[#1F8FBF] flex justify-center items-center absolute">
                </div>
            )}
        </div>
    );
}