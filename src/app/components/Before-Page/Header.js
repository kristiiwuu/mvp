import RightArrow from 'public/right-arrow.svg'
import { useRouter } from 'next/navigation';

export default function Header({title}) {
    const router = useRouter();
    const handleReturnHome = () => {
        router.push('/student-portal');
    }
   
    return(
        <div className="font-semibold bg-[#1F8FBF] h-[13.5%] w-screen text-3xl flex text-center items-center p-5 text-white cursor-default">
            <div className="ml-4 flex justify-center items-center gap-5">
                <div onClick={handleReturnHome} className="cursor-pointer">BIOLOGY</div>
                <RightArrow />
                <div className="cursor-default">{title ? title : ''}</div>
            </div>
        </div>
    );
}