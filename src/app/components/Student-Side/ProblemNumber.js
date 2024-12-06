export default function ProblemNumber({ num, selected, onClick, isCorrect, isStarted }) {
    const getClasses = () => {
        if (isCorrect) {
            return 'text-white border border-[#79d38d] bg-[#79d38d]';
        } else if (selected) {
            return 'bg-[#1F8FBF] border-[#1F8FBF] text-white hover:text-white';
        } else if (isStarted) {
            return 'border-[#1F8FBF] text-[#1F8FBF]';
        } else {
            return 'border-transparent text-[#B8B7AF]';
        }
    };

    const dynamicClasses = `flex justify-center items-center border rounded-[50%] w-12 h-12
        hover:bg-[#58B6DF] hover:text-white hover:border-[#58B6DF]
        ${getClasses()}
`;
    
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