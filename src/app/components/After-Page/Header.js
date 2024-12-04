import RightArrow from 'public/right-arrow.svg'

export default function Header({title}) {
   
    return(
        <div className="bg-[#1F8FBF] w-screen h-[20%] text-3xl flex text-center items-center p-5 text-white">
            <div className="ml-4 flex justify-center items-center gap-5">
                BIOLOGY 
                <RightArrow />
                {title ? title : ''}
            </div>
        </div>
    );
}