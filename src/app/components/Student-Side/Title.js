export default function Header({title, num}) {
    return(
        <div className="font-semibold bg-[#1F8FBF] w-auto h-[12.5%] text-3xl flex text-center items-center pl-5">
            <div className="ml-4" style={{ color: 'white' }}>
                Homework #{num}: {title}
            </div>
        </div>
    );
}