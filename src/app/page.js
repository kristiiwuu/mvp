"use client"
import { useState } from 'react';
import { login, signup } from "../app/login/actions";
import BlueDuey from 'public/blue-duey.svg';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="font-orienta h-screen bg-[#F8F7F4] pt-[5%] pb-[5%] flex text-black justify-center items-center">
      <div className="h-full w-[40%] rounded-lg border-2 border-[#B8B7AF] bg-white shadow-custom flex flex-col justify-center items-center px-[5%]">
        <BlueDuey className="scale-75"/>
        <div className="text-[200%] text-[#226387] m-0">welcome to <i>due</i></div>
        
        <div className="flex">
          <button onClick={() => setIsLogin(true)} className={`rounded-l-[6px] px-4 py-2 ${isLogin ? 'bg-[#1F8FBF] text-white' : 'bg-[#CDCDCD]'}`}>Log in</button>
          <button onClick={() => setIsLogin(false)} className={`rounded-r-[6px] px-4 py-2 ${!isLogin ? 'bg-[#1F8FBF] text-white' : 'bg-[#CDCDCD]'}`}>Sign up</button>
        </div>

        <form className="flex flex-col text-[#A1A1A1] self-stretch mt-[2%] mb-0">
          {isLogin ? (
            <>
              <label htmlFor="email" className="text-[70%]">Email:</label>
              <input
                className="bg-[#EBEAE6] rounded-[6px] h-[15%] text-black"
                id="email"
                name="email"
                type="email"
                required
              />
              <label className="mt-3 text-[70%]" htmlFor="password">Password:</label>
              <input
                className="bg-[#EBEAE6] rounded-[6px] h-[15%] text-black"
                id="password"
                name="password"
                type="password"
                required
              />
              <button
                className="self-center w-[40%] h-[25%] px-5 py-3 text-white bg-[#1F8FBF] hover:bg-[#58B6DF] rounded-[12px] mt-[4%] mb-[2%] flex justify-center items-center"
                formAction={login}
              >
                Log in
              </button>
            </>
          ) : (
            <>
              <label htmlFor="name" className="text-[70%]">Name:</label>
              <input
                className="bg-[#EBEAE6] rounded-[6px] h-[12%]"
                id="name"
                name="name"
                type="text"
                required
              />
              <label htmlFor="email" className="mt-3 text-[70%]">Email:</label>
              <input
                className="bg-[#EBEAE6] rounded-[6px] h-[12%]"
                id="email"
                name="email"
                type="email"
                required
              />
              <label className="mt-3 text-[70%]" htmlFor="password">Password:</label>
              <input
                className="bg-[#EBEAE6] rounded-[6px] h-[12%]"
                id="password"
                name="password"
                type="password"
                required
              />
              <button
                className="self-center w-[40%] h-[20%] px-5 py-3 text-white bg-[#1F8FBF] hover:bg-[#58B6DF] rounded-[12px] mt-[4%] mb-[2%] flex justify-center items-center"
                formAction={signup}
              >
                Sign up
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
