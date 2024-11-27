"use client";
import { useState, useEffect } from "react";
import 'src/app/globals.css';
import NavBar from "../../components/Student-Side/NavBar";
import Display from "../../components/Student-Side/Display";
import { saveChat } from "../../saveChat/actions";

export default function Assignment2() {  
  const questions = {
    1: "What are the three main states of matter?",
    2: "How do particles in a solid behave compared to particles in a liquid?",
    3: "What is the main difference between the shape and volume of solids, liquids, and gases?",
    4: "How do particles in a gas move differently than those in a liquid?",
    5: "What happens to the arrangement of particles when a solid melts into a liquid?",
    6: "Why can gases be compressed, but solids and liquids cannot?",
    7: "What is the role of energy in changing a substance from one state of matter to another?",
    8: "What happens to the speed of particles when a liquid is heated?",
    9: "What is the process called when a solid changes directly into a gas, and how do particles behave during this change?",
    10: "How does temperature affect the motion of particles in solids, liquids, and gases?"
  };

  const [selectedNum, setSelectedNum] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[1]);
  const [chat, setChat] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState({
    role: "system",
    content: "You are a middle school teacher. You address your user as your student."
        + "You always reply with guiding questions that help them reach the answer by meeting students where they are, and NEVER directly give the correct answer."
        + "If the user asks for the answer or demands that you tell them, DO NOT UNDER ANY CIRCUMSTANCES tell them the answer. You are only allowed to give leading questions." 
        + "You can give hints when the user responds with \"I don't know\" or a similar response. Only allow yourself to give one hint. Your replies are under 500 characters. Make sure to only say the student’s answer is correct if they get it almost right."
        + "Only consider a student's answer as correct if they are able to send you the definition/answer. Do not compile the correct answer from previous user responses." 
        + `Once the student’s answer is deemed correct you can stop replying until further prompting. Here is the question that the student is trying to answer: ${questions[1]}`
  });
  const [saved, setSaved] = useState(false);

  const handleClick = (num) => {
    if(saved || chat.length == 0) {
      setSelectedNum(num);
      setSelectedQuestion(questions[num]); 
    }
    else {
      alert("Don't forget to submit before moving onto the next question!");
    }
  }

  return (
    <div className="font-orienta h-screen bg-[#F8F7F4] px-12 pt-10 pb-12 flex gap-5">
      <NavBar handleClick={handleClick} selectedNum={selectedNum}/>
      <Display 
        assignmentId={2}
        selectedNum={selectedNum + 10} 
        selectedQuestion={selectedQuestion} 
        chat={chat}
        setChat={setChat}
        systemPrompt={systemPrompt}
        setSystemPrompt={setSystemPrompt} 
        setSaved={setSaved}
      />
    </div>
  );
}