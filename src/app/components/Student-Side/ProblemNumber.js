export default function ProblemNumber({ num, selected, onClick, isCorrect, isStarted }) {
    return (
        <div 
        onClick={onClick} 
        className={`flex justify-center items-center border rounded-[50%] w-12 h-12 hover:bg-[#58B6DF] hover:text-white hover:border-[#58B6DF]
        ${isCorrect? 'text-white border border-[#79d38d] bg-[#79d38d] ': 
            selected ? 'bg-[#1F8FBF] border-[#1F8FBF] text-white hover:text-white':
                isStarted ? 'border-[#1F8FBF]':'border-transparent text-[#B8B7AF]'}`}>
        {num}
    </div>
    );
}