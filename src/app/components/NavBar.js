import ProblemNumber from "./ProblemNumber";

export default function NavBar() {

    return (
        <div className="w-[85px] h-auto border-2 rounded-[12px] border-[#D7D7D7] bg-[#FFF] text-black px-4 py-6 flex flex-col justify-between gap-5">
            <ProblemNumber num={1} />
            <ProblemNumber num={2} />
            <ProblemNumber num={3} />
            <ProblemNumber num={4} />
            <ProblemNumber num={5} />
            <ProblemNumber num={6} />
            <ProblemNumber num={7} />
            <ProblemNumber num={8} />
            <ProblemNumber num={9} />
            <ProblemNumber num={10} />
        </div>
    );
}