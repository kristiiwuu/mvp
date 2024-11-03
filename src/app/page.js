"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import './globals.css';
import NavBar from "./components/NavBar";
import Display from "./components/Display";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the chat page with question and answer as query parameters
    router.push(`/chat?question=${question}&answer=${answer}`);
  };

  return (
    <div className="h-auto bg-[#F8F7F4] px-12 pt-20 pb-12 flex gap-9">
      <NavBar />
      <Display />
    </div>
  );
}

    // <div className="bg-black flex flex-col items-center justify-center h-screen">
    //     <form className="flex flex-col gap-[10px]" onSubmit={handleSubmit}>
    //       <h1>Question</h1>
    //       <textarea 
    //       className="w-96 h-24 p-2 rounded text-black"
    //       placeholder="Enter your question"
    //       value={question}
    //       onChange={(e) => setQuestion(e.target.value)}
    //     />
    //     <h1>Answer</h1>
    //     <textarea 
    //       className="w-96 h-24 p-2 rounded text-black"
    //       placeholder="Enter your answer"
    //       value={answer}
    //       onChange={(e) => setAnswer(e.target.value)}
    //     />
    //     <button 
    //       type="submit" 
    //       className="bg-white text-black px-4 py-2 rounded"
    //     >
    //       Submit
    //     </button>
    //     </form>
    // </div>
