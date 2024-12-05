"use client"
import React from 'react';
import Header from '../components/Before-Page/Header';
import HappyDuey from 'public/happy-duey.svg';
import { redirect } from 'next/navigation'

export default function StudentPortal() {

    const handleClick = () => {
        redirect('/student-portal')
    }
 
    return (
        <div className=" w-auto bg-[#F8F7F4] h-screen flex flex-col pb-12 items-center gap-5">
            <Header />
            <div className="flex flex-col justify-center items-center gap-5 mt-10">
                <HappyDuey />
                <div className="font-semibold text-black flex text-4xl">Assignment Finished!</div>
                <button className='font-bold flex w-[200px] px-2 py-2 justify-center items-center bg-[#1F8FBF] text-white rounded-[6px] hover:bg-[#58B6DF]'
                onClick={handleClick}>
                    Return Home
                </button>
            </div>
            
        </div>
    );
}
