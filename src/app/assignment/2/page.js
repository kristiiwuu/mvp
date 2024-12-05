"use client";
import { useState, useEffect } from "react";
import 'src/app/globals.css';
import NavBar from "../../components/Student-Side/NavBar";
import Display from "../../components/Student-Side/Display";
import Title from '../../components/Student-Side/Title'

export default function Assignment2() {  
  const title = "States of Matter HW";

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

  const answers = {
    1: "The three main states of matter are solid, liquid, and gas.",
    2: "Particles in a solid are closely packed and vibrate in fixed positions, while particles in a liquid are more loosely arranged and can move past each other.",
    3: "Solids have a fixed shape and volume, liquids have a fixed volume but take the shape of their container, and gases have neither a fixed shape nor volume and expand to fill their container.",
    4: "Particles in a gas move freely and randomly at high speeds, while particles in a liquid are closer together and slide past each other more slowly.",
    5: "When a solid melts into a liquid, the particles gain energy, overcome some of their fixed positions, and move more freely while remaining close together.",
    6: "Gases can be compressed because their particles are far apart, whereas solids and liquids have closely packed particles, leaving little room for compression.",
    7: "Energy is required to break the bonds between particles during state changes, such as melting or boiling, and is released when particles form bonds during freezing or condensation.",
    8: "When a liquid is heated, the speed of its particles increases as they gain kinetic energy.",
    9: "The process is called sublimation. During sublimation, particles gain enough energy to transition directly from the solid phase to the gas phase without passing through the liquid phase.",
    10: "As temperature increases, particles in solids, liquids, and gases move faster because they gain kinetic energy; at lower temperatures, particle motion slows down."
};

  const [selectedNum, setSelectedNum] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[1]);
  const [chat, setChat] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(answers[1]);
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
  const [chatHistory, setChatHistory] = useState({}); // stores chat history for each question #
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCorrectArray, setIsCorrectArray] = useState(Array(10).fill(false)); // Track correctness for each question
  const [startedArray, setStartedArray] = useState(Array(10).fill(false)); // Track correctness for each question

  const handleClick = (num) => {
    setChatHistory(prev => ({ ...prev, [selectedNum]: chat })); // save the current chat under key of selectedNum
    setSelectedNum(num);  // change selectedNum to the new question #
    setSelectedQuestion(questions[num]);
    setSelectedAnswer(answers[num]);
    setIsCorrectArray(prev => {
        const newArray = [...prev];
        newArray[num - 1] = isCorrect; // Update the correctness for the selected question
        return newArray;
    });
    setStartedArray(prev => { // indicate user started the question
      const newArray = [...prev];
      newArray[num-1] = chat.length > 0;
      return newArray;
    })
  }

  // Effect to restore chat when selectedNum changes
  useEffect(() => {
    setChat(chatHistory[selectedNum] || []);
  }, [selectedNum]);

  return (
    <div className="h-screen bg-[#F8F7F4] flex flex-col">
      <Title title={title} num={2}/>
      <div className="flex gap-3 px-7 pt-5 h-[87%] min-h-[80%]"> 
        <NavBar handleClick={handleClick} selectedNum={selectedNum} isCorrectArray={isCorrectArray} startedArray={startedArray}/>
        <Display 
          assignmentId={2}
          selectedNum={selectedNum} 
          selectedQuestion={selectedQuestion} 
          selectedAnswer={selectedAnswer} 
          chat={chat}
          setChat={setChat}
          systemPrompt={systemPrompt}
          setSystemPrompt={setSystemPrompt} 
          saved={saved}
          setSaved={setSaved}
          isCorrect = {isCorrect}
          setIsCorrect={setIsCorrect}
        />
      </div>
    </div>
  );
}