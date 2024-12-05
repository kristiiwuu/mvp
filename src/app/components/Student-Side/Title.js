
export default function Header({title, num}) {
    return(
        <div className="font-semibold bg-[#1F8FBF] w-auto h-[15%] text-3xl flex text-center items-center pl-5">
            <div className="ml-4">
                Homework #{num}: {title}
            </div>
        </div>
    );
}