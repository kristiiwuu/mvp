"use client";
import { useState, useEffect } from "react";
import 'src/app/globals.css';
import NavBar from "../../components/Student-Side/NavBar";
import Display from "../../components/Student-Side/Display";
import Title from '../../components/Student-Side/Title';

export default function Assignment3() {  

  const title = "Water Cycle HW";

  const questions = {
    1: "What are the four main processes in the water cycle?",
    2: "How does water from lakes and oceans become water vapor in the air?",
    3: "What is the process called when water vapor cools and turns back into liquid?",
    4: "What is precipitation, and what forms can it take?",
    5: "How does water return to the oceans after falling as precipitation?",
    6: "What is the role of the sun in driving the water cycle?",
    7: "What happens during infiltration, and how does it affect groundwater?",
    8: "What is transpiration, and how do plants contribute to the water cycle?",
    9: "How does the water cycle help distribute heat around the Earth?",
    10: "Why is the water cycle important for life on Earth?"
  };

  const answers = {
    1: "The four main processes in the water cycle are evaporation, condensation, precipitation, and collection.",
    2: "Water from lakes and oceans becomes water vapor through evaporation, where heat from the sun causes water to change from a liquid to a gas.",
    3: "The process is called condensation, where water vapor cools and turns back into liquid, forming clouds.",
    4: "Precipitation is water released from clouds in the form of rain, snow, sleet, or hail.",
    5: "Water returns to the oceans through surface runoff, rivers, and streams, as well as through groundwater flow.",
    6: "The sun provides energy that drives the water cycle by causing evaporation and heating the Earth's surface, initiating movement of water between states.",
    7: "During infiltration, water soaks into the ground and replenishes groundwater, which can later flow into rivers, lakes, and oceans.",
    8: "Transpiration is the process where plants release water vapor into the air through their leaves, contributing to the water cycle by adding moisture to the atmosphere.",
    9: "The water cycle helps distribute heat around the Earth through the movement of water in its various states, influencing weather patterns and climate.",
    10: "The water cycle is important for life on Earth because it provides fresh water for drinking, agriculture, and ecosystems, while regulating temperature and weather."
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
    const previousNum = selectedNum; // Store the previous selected number
    setIsCorrectArray(prev => {
        const newArray = [...prev];
        newArray[previousNum - 1] = isCorrect; // Update the correctness for the previously selected question
        return newArray;
    });
    setStartedArray(prev => { // indicate user started the question
      const newArray = [...prev];
      newArray[previousNum - 1] = chat.length > 0; // Update the started status for the previously selected question
      return newArray;
    })
  }

  // Effect to restore chat when selectedNum changes
  useEffect(() => {
    setChat(chatHistory[selectedNum] || []);
  }, [selectedNum]);

  return (
    <div className=" h-screen bg-[#F8F7F4] flex flex-col">
      <Title title={title} num={3}/>
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