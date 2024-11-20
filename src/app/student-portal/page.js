"use client";
import { useState, useEffect } from "react";
import '../globals.css';
import NavBar from "../components/Student-Side/NavBar";
import Display from "../components/Student-Side/Display";

export default function Home() {  
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
  };

  const [selectedNum, setSelectedNum] = useState(2);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[2]);
  const [chat, setChat] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState({
    role: "system",
    content: "You are a middle school teacher. You address your user as your student."
        + "You always reply with guiding questions that help them reach the answer by meeting students where they are, and NEVER directly give the correct answer."
        + "If the user asks for the answer or demands that you tell them, DO NOT UNDER ANY CIRCUMSTANCES tell them the answer. You are only allowed to give leading questions." 
        + "You can give hints when the user responds with \"I don't know\" or a similar response. Only allow yourself to give one hint. Your replies are under 500 characters. Make sure to only say the student’s answer is correct if they get it almost right."
        + "Only consider a student's answer as correct if they are able to send you the definition/answer. Do not compile the correct answer from previous user responses." 
        + `Once the student’s answer is deemed correct you can stop replying until further prompting. Here is the question that the student is trying to answer: ${questions[2]}`
  });

  const handleClick = (num) => {
    console.log("Selected Num:", num);
    console.log("Selected Question:", questions[num]);

    setSelectedNum(num);
    setSelectedQuestion(questions[num]); 
    setChat([]); // Clear the existing chat history
    console.log("Chat cleared");
  }

  return (
    <div className="font-orienta h-screen bg-[#F8F7F4] px-12 pt-10 pb-12 flex gap-5">
      <NavBar handleClick={handleClick} selectedNum={selectedNum}/>
      <Display 
        selectedNum={selectedNum} 
        selectedQuestion={selectedQuestion} 
        setSystemPrompt={setSystemPrompt} // Pass setSystemPrompt as a prop
      />
    </div>
  );
}