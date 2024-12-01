import Home from 'public/home.svg';

export default function Header({handleClickHome}) {
    return(
        <div className="bg-[#1F8FBF] w-auto h-[20%] text-3xl flex text-center items-center p-5">
            <Home className="scale-90" onClick={handleClickHome}/>
            <div className="ml-4">
                Biology - Period 5
            </div>
        </div>
    );
}