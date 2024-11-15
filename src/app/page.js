"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import './globals.css';
import NavBar from "./components/Student-Side/NavBar";
import Display from "./components/Student-Side/Display";

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
    <div className="font-orienta h-auto bg-[#F8F7F4] px-12 pt-20 pb-12 flex gap-9">
      <NavBar />
      <Display />
    </div>
  );
}