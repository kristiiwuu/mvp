"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, signup } from "../app/login/actions";
import BlueDuey from 'public/blue-duey.svg';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleTeacherPortal = () => {
    router.push('/teacher-portal');
  };

  return (
    <div className="font-figtree h-screen bg-[#F8F7F4] pt-[5%] pb-[5%] flex text-black justify-center items-center">
      <div className="fixed h-[85%] w-[500px] rounded-lg border-2 border-[#B8B7AF] bg-white shadow-custom flex flex-col justify-center items-center px-[5%]">
        <BlueDuey className="scale-75"/>
        <div className="text-[200%] text-[#226387] mb-7">welcome to <i className="font-bold">due</i></div>
        
        <div className="flex w-full justify-center">
          <button onClick={() => setIsLogin(true)} className={`w-full rounded-l-[6px] px-4 py-2 ${isLogin ? 'bg-[#1F8FBF] text-white' : 'bg-[#FFF] border border-[#B8B7AF] rounded-l-[6px] hover:bg-[#C7E3EF] hover:border-[#C7E3EF]'}`}>Log in</button>
          <button onClick={() => setIsLogin(false)} className={`w-full rounded-r-[6px] px-4 py-2 ${!isLogin ? 'bg-[#1F8FBF] text-white' : 'bg-[#FFF] border border-[#B8B7AF] rounded-r-[6px] hover:bg-[#C7E3EF] hover:border-[#C7E3EF]'}`}>Sign up</button>
        </div>

        <form className="flex flex-col text-[#A1A1A1] self-stretch mt-[2%] mb-0">
          {isLogin ? (
            <div className="flex flex-col h-[200px]">
              <label htmlFor="email" className="text-[70%]">Email:</label>
              <input
                className="px-2 py-3 bg-[#EBEAE6] rounded-[6px] h-[10%] text-black"
                id="email"
                name="email"
                type="email"
                required
              />
              <label className="mt-3 text-[70%]" htmlFor="password">Password:</label>
              <input
                className="px-2 py-3 bg-[#EBEAE6] rounded-[6px] h-[10%] text-black"
                id="password"
                name="password"
                type="password"
                required
              />
              <button
                className="self-center w-[40%] h-[20%] px-5 py-3 text-white bg-[#1F8FBF] hover:bg-[#58B6DF] rounded-[6px] mt-[4%] mb-[2%] flex justify-center items-center"
                formAction={login}
              >
                Log in
              </button>
            </div>
          ) : (
            <div className="flex flex-col h-[200px]">
              <label htmlFor="name" className="text-[70%]">Name:</label>
              <input
                className="px-2 py-3 bg-[#EBEAE6] rounded-[6px] h-[12%] text-black"
                id="name"
                name="name"
                type="text"
                required
              />
              <label htmlFor="email" className="mt-3 text-[70%]">Email:</label>
              <input
                className="px-2 py-3 bg-[#EBEAE6] rounded-[6px] h-[12%] text-black"
                id="email"
                name="email"
                type="email"
                required
              />
              <label className="mt-3 text-[70%]" htmlFor="password">Password:</label>
              <input
                className="px-2 py-3 bg-[#EBEAE6] rounded-[6px] h-[12%] text-black"
                id="password"
                name="password"
                type="password"
                required
              />
              <button
                className="self-center w-[40%] h-[20%] px-5 py-3 text-white bg-[#1F8FBF] hover:bg-[#58B6DF] rounded-[6px] mt-[4%] mb-[2%] flex justify-center items-center"
                formAction={signup}
              >
                Sign up
              </button>
            </div>
          )}
        </form>
        <button
          onClick={handleTeacherPortal}
          className="mt-4 w-[40%] py-2 text-gray-500 hover:text-[#1F8FBF] hover:underline rounded-[6px] flex justify-center items-center"
        >
          Teacher Portal
        </button>
      </div>
    </div>
  );
}
