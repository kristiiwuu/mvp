"use client"
import { redirect } from 'next/navigation'

export default function ErrorPage() {

  const handleClick = () => {
    redirect('/')
}

  return (
    <div className="font-figtree h-screen bg-[#F8F7F4] text-[#1F8FBF] text-3xl flex flex-col justify-center items-center">
       <p>User already exists. Try logging in.</p>
       <button className='mt-5 flex w-[200px] px-2 py-2 justify-center items-center bg-[#1F8FBF] text-white rounded-[6px] hover:bg-[#58B6DF]'
        onClick={handleClick}>
          Return
        </button>
    </div>
  );
}


