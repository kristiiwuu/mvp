"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import './globals.css';
import NavBar from "./components/Student-Side/NavBar";
import Display from "./components/Student-Side/Display";

export default function Home() {
  // const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");
  // const router = useRouter();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Navigate to the chat page with question and answer as query parameters
  //   router.push(`/chat?question=${question}&answer=${answer}`);
  // };

  const [selectedNum, setSelectedNum] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState("What does symbiosis mean in your own words? How is it different from other ways animals and plants interact? Can you give an example?");

  const questions = {
        1: "What does symbiosis mean in your own words? How is it different from other ways animals and plants interact? Can you give an example?",
        2: "What is mutualism? How does the goby fish and snapping shrimp partnership show mutualism?",
        3: "What is commensalism? Can you describe a situation where one animal benefits, but the other isn’t helped or harmed?",
        4: "How is parasitism different from mutualism and commensalism? How does the African oxpecker act like both a helper and a parasite?",
        5: "What do mitochondria do inside our cells? What might happen to living things if cells didn’t have mitochondria?",
        6: "Corals and algae work together to help each other. What happens to coral reefs during coral bleaching, and why does it hurt this partnership?",
        7: "How do cleaner fish help bigger fish? What do cleaner fish do to make sure they aren’t eaten by their clients?",
        8: "Why is symbiosis like teamwork in nature? How do ants and fungi work together to survive?",
        9: "How do bees and orchids help each other? What might happen to orchids if there were no bees?",
        10: "How can changes in the environment, like pollution or warming oceans, affect partnerships like the one between coral and algae?"
  }

  const handleClick = (num) => {
    setSelectedNum(num);
    setSelectedQuestion(questions[num]); 
}

  return (
    <div className="font-orienta h-auto bg-[#F8F7F4] px-12 pt-20 pb-12 flex gap-9">
      <NavBar handleClick={handleClick} selectedNum={selectedNum}/>
      <Display selectedQuestion={selectedQuestion}/>
    </div>
  );
}