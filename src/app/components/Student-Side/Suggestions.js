export default function Suggestions({text, onClick}) {
    return(
        <div className="hover:border-[#7EB8D0] border-2 border-[#D5E6EDB2] bg-[#D5E6EDB2] text-[#084762] rounded-[30px] flex text-center px-6 py-3"
            onClick={onClick}>
            {text}
        </div>
    );
}