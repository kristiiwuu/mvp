import BlueDuey from 'public/blue-duey.svg'

export default function Greeting({userName}) {
    return(
        <div className="text-black h-[50%] w-auto flex justify-center items-center flex-row p-6"> 
            <BlueDuey className="scale-75"/>
           <div className="text-5xl">
                Hi, {userName}!
            </div>
        </div>
    );
}