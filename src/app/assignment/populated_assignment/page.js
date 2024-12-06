"use client";

import { useState, useEffect } from "react";
import "src/app/globals.css";
import NavBar from "../../components/Student-Side/NavBar";
import Display from "../../components/Student-Side/Display";
import Title from "../../components/Student-Side/Title";
import { useRouter, useSearchParams } from "next/navigation";

export default function PopulatedAssignment() {
  const title = "ESG and Corporate Responsibility HW";

  const searchParams = useSearchParams();
  const loadedQuestions = searchParams.get("questions");

  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    try {
      // Parse the query parameter into JSON
      const parsedQuestions = JSON.parse(loadedQuestions).questions;

      const questionObj = {};
      const answerObj = {};

      // Assume each question includes "question" and "answer" keys
      parsedQuestions.forEach((item, index) => {
        questionObj[index + 1] = item.question;
        answerObj[index + 1] = item.answer;
      });

      setQuestions(questionObj);
      setAnswers(answerObj);
      console.log("Questions loaded:", questionObj);
      console.log("Answers loaded:", answerObj);
    } catch (error) {
      console.error("Error parsing questions:", error);
    }
  }, [loadedQuestions]);

  const [selectedNum, setSelectedNum] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [systemPrompt, setSystemPrompt] = useState({
    role: "system",
    content: "",
  });
  const [saved, setSaved] = useState(false);
  const [chatHistory, setChatHistory] = useState({});

  useEffect(() => {
    if (questions[selectedNum]) {
      setSelectedQuestion(questions[selectedNum]);
      setSelectedAnswer(answers[selectedNum]);

      setSystemPrompt({
        role: "system",
        content:
          "You are a middle school teacher. You address your user as your student." +
          "You always reply with guiding questions that help them reach the answer by meeting students where they are, and NEVER directly give the correct answer." +
          "If the user asks for the answer or demands that you tell them, DO NOT UNDER ANY CIRCUMSTANCES tell them the answer. You are only allowed to give leading questions." +
          "You can give hints when the user responds with \"I don't know\" or a similar response. Only allow yourself to give one hint. Your replies are under 500 characters. Make sure to only say the student's answer is correct if they get it almost right." +
          "Only consider a student's answer as correct if they are able to send you the definition/answer. Do not compile the correct answer from previous user responses." +
          `Once the student's answer is deemed correct you can stop replying until further prompting. Here is the question that the student is trying to answer: ${questions[selectedNum]}`,
      });
    }
  }, [selectedNum, questions, answers]);

  const handleClick = (num) => {
    setChatHistory((prev) => ({ ...prev, [selectedNum]: chat }));
    setSelectedNum(num);
  };

  useEffect(() => {
    setChat(chatHistory[selectedNum] || []);
  }, [selectedNum]);

  return (
    <div className="font-figtree h-screen bg-[#F8F7F4] flex flex-col">
      <Title title={title} num={4} />
      <div className="flex gap-5 px-12 pt-5 h-[80%] min-h-[80%]">
        <NavBar handleClick={handleClick} selectedNum={selectedNum} />
        <Display
          assignmentId={4}
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
