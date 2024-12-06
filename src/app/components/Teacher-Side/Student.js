import DueyFace from 'public/duey-face.svg'

export default function Student({name, num}) {
    return(
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 relative">
                <div className={`absolute h-10 w-10 rounded-[50%] flex justify-center items-center flex-col
                    ${num % 4 === 0 ? "bg-[#7EB8D0]" : num % 3 === 0 ? "bg-[#EBD168]" :
                        num % 2 === 0 ? "bg-[#D07EA6]" : "bg-[#ADCE9C]"} `}>
                <DueyFace />  
                </div>
                <div className="ml-12">
                    {name}
                </div>
            </div>
            <hr className="border-t border-gray-300 w-full" />
        </div>
       
    );
}