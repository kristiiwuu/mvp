export default function Question({selectedQuestion}) {

    return(
        <div className="font-bold text-2xl text-black border-2 rounded-[12px] border-[#D7D7D7] bg-[#FFF] px-9 py-6 flex flex-col justify-between gap-5 w-auto">
            {selectedQuestion}
        </div>
    );
}