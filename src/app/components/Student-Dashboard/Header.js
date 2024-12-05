import Home from 'public/home.svg';

export default function Header() {
    return(
        <div className="font-semibold bg-[#1F8FBF] w-auto h-[25%] text-3xl flex text-center items-center p-5">
            <Home className="scale-90"/>
            <div className="ml-4 text-white">
                BIOLOGY - Period 5
            </div>
        </div>
    );
}