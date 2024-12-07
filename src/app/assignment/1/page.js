"use client";
import { useState, useEffect } from "react";
import 'src/app/globals.css';
import NavBar from "../../components/Student-Side/NavBar";
import Display from "../../components/Student-Side/Display";
import Title from '../../components/Student-Side/Title'

export default function Assignment1() {  
  const title = "Symbiosis HW";

  const questions = {
    1: "What does symbiosis mean?",
    2: "How does the goby fish and snapping shrimp partnership demonstrate mutualism?",
    3: "How would you define commensalism?",
    4: "How is parasitism different from mutualism?",
    5: "What is the function of mitochondria in our cells?",
    6: "What happens to coral reefs during coral bleaching, and why does it harm the partnership between corals and algae?",
    7: "How do cleaner fish assist bigger fish?",
    8: "What do cleaner fish do to avoid being eaten by their clients?",
    9: "How do ants and fungi collaborate to survive?",
    10: "How do bees and orchids benefit each other?"
  };
  

  const answers = {
    1: "Symbiosis is a relationship between two different species where they interact closely, often with one or both species benefiting. Examples include mutualism, commensalism, and parasitism.",
    2: "The goby fish and snapping shrimp demonstrate mutualism because the shrimp builds and maintains a burrow for both of them, providing shelter, while the goby acts as a lookout for predators, ensuring safety for both.",
    3: "Commensalism is a relationship where one species benefits while the other is neither helped nor harmed, such as barnacles attaching to whales for transportation without affecting the whale.",
    4: "Parasitism is different from mutualism because in parasitism, one organism benefits at the expense of the other, while in mutualism, both organisms benefit from the interaction.",
    5: "Mitochondria are the 'powerhouses' of the cell, converting nutrients into energy through a process called cellular respiration, which fuels cellular activities.",
    6: "During coral bleaching, corals expel the algae living in their tissues due to stress from environmental changes like warmer water temperatures. This harms the partnership because corals lose their primary source of energy, and the algae lose their shelter.",
    7: "Cleaner fish assist bigger fish by eating parasites and dead skin from their bodies, providing a cleaning service that benefits both. To avoid being eaten, cleaner fish often signal their role with specific behaviors or patterns that bigger fish recognize.",
    8: "Cleaner fish avoid being eaten by performing a 'dance' or adopting specific behaviors that signal to their clients that they are there to clean, not to harm, which establishes trust in the relationship.",
    9: "Ants and fungi collaborate by ants providing fungi with plant material to grow, and in return, the fungi produce food that nourishes the ants. This mutualistic relationship helps both species thrive.",
    10: "Bees and orchids benefit each other through pollination; bees transfer pollen as they collect nectar, enabling orchids to reproduce, while the bees gain food. Without bees, orchids would struggle to reproduce and might decline."
  };  

  const [selectedNum, setSelectedNum] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[1]);
  const [chat, setChat] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(answers[1])
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


  // clicking on question number
  const handleClick = (num) => {
      setChatHistory(prev => ({ ...prev, [selectedNum]: chat })); // save the current chat under key of selectedNum
      setSelectedNum(num);  // change selectedNum to the new question #
      setSelectedQuestion(questions[num]);
      setSelectedAnswer(answers[num]);
      const previousNum = selectedNum; // Store the previous selected number
      // setIsCorrectArray(prev => {
      //     const newArray = [...prev];
      //     newArray[previousNum - 1] = isCorrect; // Update the correctness for the previously selected question
      //     return newArray;
      // });
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
    <div className="h-screen bg-[#F8F7F4] flex flex-col">
      <Title title={title} num={1}/>
      <div className="flex gap-3 px-7 pt-5 h-[87%] min-h-[80%] mb-4"> 
        <NavBar handleClick={handleClick} selectedNum={selectedNum} isCorrectArray={isCorrectArray} startedArray={startedArray}/>
        <Display 
          assignmentId={1}
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
          isCorrectArray={isCorrectArray}
          setIsCorrectArray={setIsCorrectArray}
        />
      </div>
    </div>
  );
}