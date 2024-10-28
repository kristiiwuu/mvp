"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import './globals.css';

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the promptmaker page with the input text as a query parameter
    router.push(`/chat?question=${question}&answer=${answer}`);
  };

  return (
    <div className="bg-black flex flex-col items-center justify-center h-screen">
        <form className="flex flex-col gap-[10px]" onSubmit={handleSubmit}>
          <h1>Question</h1>
          <textarea 
          className="w-96 h-24 p-2 rounded text-black"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <h1>Answer</h1>
        <textarea 
          className="w-96 h-24 p-2 rounded text-black"
          placeholder="Enter your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-white text-black px-4 py-2 rounded"
        >
          Submit
        </button>
        </form>
    </div>
  );
}
