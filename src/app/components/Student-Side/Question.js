export default function Question({selectedQuestion}) {
    return(
        <div className="font-semibold text-2xl text-black border-2 rounded-[12px] border-[#D7D7D7] bg-[#FFF] px-6 py-4 flex flex-col justify-between gap-5 w-auto"
        onCopy ={(e) => e.preventDefault()}>
            {selectedQuestion}
        </div>
    );
}