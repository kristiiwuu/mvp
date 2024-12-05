"use client";
import { useState, useEffect } from "react";
import 'src/app/globals.css';
import NavBar from "../../components/Student-Side/NavBar";
import Display from "../../components/Student-Side/Display";
import Title from '../../components/Student-Side/Title'

export default function Assignment1() {  
  const title = "Symbiosis HW";

  const questions = {
    1: "What does symbiosis mean in your own words? How is it different from other ways animals and plants interact?",
    2: "What is mutualism? How does the goby fish and snapping shrimp partnership show mutualism?",
    3: "What is commensalism?",
    4: "How is parasitism different from mutualism and commensalism? How does the African oxpecker act like both a helper and a parasite?",
    5: "What do mitochondria do inside our cells? What might happen to living things if cells didn’t have mitochondria?",
    6: "Corals and algae work together to help each other. What happens to coral reefs during coral bleaching, and why does it hurt this partnership?",
    7: "How do cleaner fish help bigger fish? What do cleaner fish do to make sure they aren’t eaten by their clients?",
    8: "Why is symbiosis like teamwork in nature? How do ants and fungi work together to survive?",
    9: "How do bees and orchids help each other? What might happen to orchids if there were no bees?",
    10: "How can changes in the environment, like pollution or warming oceans, affect partnerships like the one between coral and algae?"
  };

  const answers = {
    1: "Symbiosis is a relationship between two different species where they live together and interact in a way that benefits at least one of them, and often both. This is different from other interactions like predation, where one species benefits at the expense of another, or competition, where species fight for resources.",
    2: "Mutualism is a type of symbiotic relationship where both species involved benefit from the interaction. In mutualism, both organisms gain something that helps them survive or thrive. The partnership between the goby fish and snapping shrimp is a great example of mutualism. The shrimp digs and maintains a burrow for both of them, providing safety, while the goby fish keeps watch for predators. Both species benefit— the shrimp gets protection and the fish gets a safe place to live.",
    3: "Commensalism is a type of relationship between two species where one species benefits, and the other is neither helped nor harmed. In this interaction, one organism gains something like food or shelter, while the other doesn't experience any significant effect.",
    4: "How is parasitism different from mutualism and commensalism? How does the African oxpecker act like both a helper and a parasite?",
    5: "What do mitochondria do inside our cells? What might happen to living things if cells didn’t have mitochondria?",
    6: "Corals and algae work together to help each other. What happens to coral reefs during coral bleaching, and why does it hurt this partnership?",
    7: "How do cleaner fish help bigger fish? What do cleaner fish do to make sure they aren’t eaten by their clients?",
    8: "Why is symbiosis like teamwork in nature? How do ants and fungi work together to survive?",
    9: "How do bees and orchids help each other? What might happen to orchids if there were no bees?",
    10: "How can changes in the environment, like pollution or warming oceans, affect partnerships like the one between coral and algae?"
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

  // clicking on question number
  const handleClick = (num) => {
      setChatHistory(prev => ({ ...prev, [selectedNum]: chat })); // save the current chat under key of selectedNum
      setSelectedNum(num);  // change selectedNum to the new question #
      setSelectedQuestion(questions[num]);
      setSelectedAnswer(answers[num])
  }

  // Effect to restore chat when selectedNum changes
  useEffect(() => {
    setChat(chatHistory[selectedNum] || []);
  }, [selectedNum]);

  return (
    <div className="font-orienta h-screen bg-[#F8F7F4] flex flex-col">
      <Title title={title} num={1}/>
      <div className="flex gap-5 px-12 pt-5 h-[80%] min-h-[80%]"> 
        <NavBar handleClick={handleClick} selectedNum={selectedNum}/>
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
        />
      </div>
    </div>
  );
}